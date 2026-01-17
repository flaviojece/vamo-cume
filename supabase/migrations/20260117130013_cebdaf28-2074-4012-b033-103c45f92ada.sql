-- Criar tipo enum para roles de usuário
CREATE TYPE public.app_role AS ENUM ('customer', 'restaurant_owner', 'deliveryman', 'admin');

-- Criar tabela de roles de usuário
CREATE TABLE public.user_roles (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id uuid NOT NULL,
    role app_role NOT NULL,
    created_at timestamptz DEFAULT now(),
    UNIQUE (user_id, role)
);

-- Habilitar RLS na tabela user_roles
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

-- Função segura para verificar se usuário tem uma role específica
CREATE OR REPLACE FUNCTION public.has_role(_user_id uuid, _role app_role)
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.user_roles
    WHERE user_id = _user_id AND role = _role
  )
$$;

-- Políticas RLS para user_roles
CREATE POLICY "Usuários podem ver suas próprias roles"
ON public.user_roles FOR SELECT
USING (auth.uid() = user_id);

CREATE POLICY "Apenas admins podem inserir roles"
ON public.user_roles FOR INSERT
WITH CHECK (public.has_role(auth.uid(), 'admin') OR auth.uid() = user_id);

-- Criar tabela de entregadores
CREATE TABLE public.deliverymen (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id uuid NOT NULL UNIQUE,
    full_name text NOT NULL,
    phone text NOT NULL,
    vehicle_type text NOT NULL CHECK (vehicle_type IN ('bike', 'motorcycle', 'car')),
    vehicle_plate text,
    document_url text,
    avatar_url text,
    is_active boolean DEFAULT false,
    is_available boolean DEFAULT false,
    current_lat numeric,
    current_lng numeric,
    total_deliveries integer DEFAULT 0,
    rating numeric DEFAULT 5.0,
    created_at timestamptz DEFAULT now(),
    updated_at timestamptz DEFAULT now()
);

-- Habilitar RLS na tabela deliverymen
ALTER TABLE public.deliverymen ENABLE ROW LEVEL SECURITY;

-- Políticas RLS para deliverymen
CREATE POLICY "Entregadores podem ver seu próprio perfil"
ON public.deliverymen FOR SELECT
USING (auth.uid() = user_id);

CREATE POLICY "Entregadores podem atualizar seu próprio perfil"
ON public.deliverymen FOR UPDATE
USING (auth.uid() = user_id);

CREATE POLICY "Entregadores podem criar seu próprio perfil"
ON public.deliverymen FOR INSERT
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Restaurantes podem ver entregadores disponíveis"
ON public.deliverymen FOR SELECT
USING (is_active = true AND is_available = true);

-- Criar tabela de atribuição de entregas
CREATE TABLE public.delivery_assignments (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    order_id uuid NOT NULL REFERENCES orders(id) ON DELETE CASCADE,
    deliveryman_id uuid NOT NULL REFERENCES deliverymen(id),
    status text DEFAULT 'pending' CHECK (status IN ('pending', 'accepted', 'picked_up', 'delivered', 'cancelled')),
    accepted_at timestamptz,
    picked_up_at timestamptz,
    delivered_at timestamptz,
    cancelled_at timestamptz,
    cancellation_reason text,
    delivery_fee numeric DEFAULT 0,
    tip numeric DEFAULT 0,
    created_at timestamptz DEFAULT now(),
    updated_at timestamptz DEFAULT now()
);

-- Habilitar RLS na tabela delivery_assignments
ALTER TABLE public.delivery_assignments ENABLE ROW LEVEL SECURITY;

-- Políticas RLS para delivery_assignments
CREATE POLICY "Entregadores podem ver suas próprias entregas"
ON public.delivery_assignments FOR SELECT
USING (
    deliveryman_id IN (SELECT id FROM deliverymen WHERE user_id = auth.uid())
);

CREATE POLICY "Entregadores podem atualizar suas próprias entregas"
ON public.delivery_assignments FOR UPDATE
USING (
    deliveryman_id IN (SELECT id FROM deliverymen WHERE user_id = auth.uid())
);

CREATE POLICY "Clientes podem ver entregas dos seus pedidos"
ON public.delivery_assignments FOR SELECT
USING (
    order_id IN (SELECT id FROM orders WHERE user_id = auth.uid())
);

-- Adicionar owner_id na tabela restaurants (se não existir)
ALTER TABLE public.restaurants ADD COLUMN IF NOT EXISTS owner_id uuid;

-- Atualizar políticas RLS de restaurants para permitir que donos gerenciem
CREATE POLICY "Donos podem atualizar seus próprios restaurantes"
ON public.restaurants FOR UPDATE
USING (auth.uid() = owner_id);

CREATE POLICY "Donos podem inserir seus próprios restaurantes"
ON public.restaurants FOR INSERT
WITH CHECK (auth.uid() = owner_id);

-- Atualizar políticas RLS de menu_categories para donos
CREATE POLICY "Donos podem gerenciar categorias"
ON public.menu_categories FOR ALL
USING (
    restaurant_id IN (SELECT id FROM restaurants WHERE owner_id = auth.uid())
);

-- Atualizar políticas RLS de menu_items para donos
CREATE POLICY "Donos podem gerenciar itens do cardápio"
ON public.menu_items FOR ALL
USING (
    restaurant_id IN (SELECT id FROM restaurants WHERE owner_id = auth.uid())
);

-- Política para restaurantes verem pedidos
CREATE POLICY "Restaurantes podem ver seus pedidos"
ON public.orders FOR SELECT
USING (
    restaurant_id IN (SELECT id FROM restaurants WHERE owner_id = auth.uid())
);

CREATE POLICY "Restaurantes podem atualizar status dos pedidos"
ON public.orders FOR UPDATE
USING (
    restaurant_id IN (SELECT id FROM restaurants WHERE owner_id = auth.uid())
);

-- Política para restaurantes verem itens dos pedidos
CREATE POLICY "Restaurantes podem ver itens dos pedidos"
ON public.order_items FOR SELECT
USING (
    order_id IN (
        SELECT o.id FROM orders o
        JOIN restaurants r ON o.restaurant_id = r.id
        WHERE r.owner_id = auth.uid()
    )
);

-- Habilitar Realtime para tabelas importantes
ALTER PUBLICATION supabase_realtime ADD TABLE public.orders;
ALTER PUBLICATION supabase_realtime ADD TABLE public.delivery_assignments;

-- Trigger para atualizar updated_at automaticamente
CREATE TRIGGER update_deliverymen_updated_at
BEFORE UPDATE ON public.deliverymen
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_delivery_assignments_updated_at
BEFORE UPDATE ON public.delivery_assignments
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Função para atribuir role ao novo usuário (trigger)
CREATE OR REPLACE FUNCTION public.handle_new_user_role()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  user_role app_role;
BEGIN
  -- Verificar metadados para determinar role
  user_role := COALESCE(
    (NEW.raw_user_meta_data->>'role')::app_role,
    'customer'::app_role
  );
  
  INSERT INTO public.user_roles (user_id, role)
  VALUES (NEW.id, user_role);
  
  RETURN NEW;
END;
$$;

-- Criar trigger para novo usuário
CREATE TRIGGER on_auth_user_created_role
AFTER INSERT ON auth.users
FOR EACH ROW
EXECUTE FUNCTION public.handle_new_user_role();