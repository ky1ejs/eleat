
ALTER TABLE "public"."item" 
ADD COLUMN "created_by_user_id" "uuid" NOT NULL;

ALTER TABLE "public"."item" 
ADD CONSTRAINT item_user_id_fkey 
FOREIGN KEY (created_by_user_id) 
REFERENCES "auth"."users" (id);

ALTER TABLE "public"."item"
RENAME COLUMN inserted_at TO created_at;

ALTER TABLE "public"."item"
  DROP COLUMN measurement_name,
  DROP COLUMN protein_per_gram,
  DROP COLUMN fat_per_gram,
  DROP COLUMN carbs_per_gram;

DROP POLICY "Enable insert for authenticated users only" 
ON "public"."item";

CREATE POLICY "Enable insert for admins only users only" 
ON "public"."item" 
FOR INSERT 
WITH CHECK (
  coalesce(get_my_claim('claims_admin')::bool,false)
);

CREATE POLICY "Enable update for admins users only" 
ON "public"."item" 
FOR UPDATE 
USING (
  coalesce(get_my_claim('claims_admin')::bool,false)
);
