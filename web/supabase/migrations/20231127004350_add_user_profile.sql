CREATE TABLE public.physical_activity_level (
    id uuid DEFAULT extensions.uuid_generate_v4() NOT NULL PRIMARY KEY,
    created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL,
    name text NOT NULL UNIQUE,
    description text NOT NULL,
    multiplier numeric NOT NULL
);

ALTER TABLE public.physical_activity_level ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Enable read on activities to authenticated users" ON public.physical_activity_level FOR SELECT TO "authenticated" USING (true);

CREATE TRIGGER update_physical_activity_level_updated_at
  BEFORE UPDATE ON public.physical_activity_level
  FOR EACH ROW
  EXECUTE PROCEDURE public.update_updated_at();

INSERT INTO public.physical_activity_level (name, description, multiplier) 
VALUES 
  ('Sedentary', 'Little or no exercise', 1.2),
  ('Lightly Active', 'Light exercise or sports 1-3 days a week', 1.375),
  ('Moderately Active', 'Moderate exercise or sports 3-5 days a week', 1.55),
  ('Very Active', 'Hard exercise or sports 6-7 days a week', 1.725),
  ('Extremely Active', 'Hard daily exercise or sports and physical job', 1.9);

CREATE TABLE public.macro_target (
    id uuid DEFAULT extensions.uuid_generate_v4() NOT NULL PRIMARY KEY,
    created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL,
    user_id uuid NOT NULL UNIQUE REFERENCES auth.users(id) ON DELETE CASCADE ON UPDATE CASCADE,
    protein_percentage numeric NOT NULL,
    fat_percentage numeric NOT NULL,
    carb_percentage numeric NOT NULL
);

CREATE TABLE public.user_profile (
    id uuid DEFAULT extensions.uuid_generate_v4() NOT NULL PRIMARY KEY,
    created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL,
    user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE ON UPDATE CASCADE,
    username text UNIQUE,
    display_name text,
    avatar_url text,
    date_of_birth date,
    weight_in_grams numeric,
    height_in_cm numeric,
    amount_of_surplus_calories numeric,
    physical_activity_level_id uuid REFERENCES public.physical_activity_level(id) ON DELETE SET NULL ON UPDATE CASCADE,
    macro_target_id uuid REFERENCES public.macro_target(id) ON DELETE SET NULL ON UPDATE CASCADE
);


ALTER TABLE public.user_profile ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Enable update user to update their profile" ON public.user_profile FOR UPDATE TO authenticated USING (auth.uid() = user_id);
CREATE POLICY "Enable update user to read their profile" ON public.user_profile FOR SELECT TO authenticated USING (auth.uid() = user_id);

-- inserts a row into public.profiles
create function public.created_profile_for_new_user()
returns trigger
language plpgsql
security definer set search_path = public
as $$
begin
  insert into public.user_profile (user_id)
  values (new.id);
  return new;
end;
$$;

-- trigger the function every time a user is created
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.created_profile_for_new_user();

CREATE TRIGGER update_user_profile_updated_at
  BEFORE UPDATE ON public.user_profile
  FOR EACH ROW
  EXECUTE PROCEDURE public.update_updated_at();

