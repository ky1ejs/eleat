
INSERT INTO
    auth.users (
        instance_id,
        id,
        aud,
        role,
        email,
        encrypted_password,
        email_confirmed_at,
        recovery_sent_at,
        last_sign_in_at,
        raw_app_meta_data,
        raw_user_meta_data,
        created_at,
        updated_at,
        confirmation_token,
        email_change,
        email_change_token_new,
        recovery_token
    ) (
        select
            '00000000-0000-0000-0000-000000000000',
            '9512fc06-496e-472f-bb9e-2da6f9243dd3',
            'authenticated',
            'authenticated',
            'user' || (ROW_NUMBER() OVER ()) || '@example.com',
            crypt ('password123', gen_salt ('bf')),
            current_timestamp,
            current_timestamp,
            current_timestamp,
            '{"provider":"email","providers":["email"]}',
            '{}',
            current_timestamp,
            current_timestamp,
            '',
            '',
            '',
            ''
        FROM
            generate_series(1, 1)
    );

-- test user email identities
INSERT INTO
    auth.identities (
        id,
        user_id,
        identity_data,
        provider,
        last_sign_in_at,
        created_at,
        updated_at
    ) (
        select
            extensions.uuid_generate_v4(),
            id,
            format('{"sub":"%s","email":"%s"}', id::text, email)::jsonb,
            'email',
            current_timestamp,
            current_timestamp,
            current_timestamp
        from
            auth.users
    );

select set_claim('9512fc06-496e-472f-bb9e-2da6f9243dd3', 'claims_admin', 'true');

INSERT INTO plan (id, updated_at, created_at, name, ordered_item_ids, user_id) 
VALUES (
  'a92e2b67-afa0-478c-8a88-208fcc528354', 
  '2021-11-25 13:23:28.000000+00:00', 
  '2021-11-25 13:23:28.000000+00:00', 
  'My Plan', 
  '{}', 
  '9512fc06-496e-472f-bb9e-2da6f9243dd3'
 );

 INSERT INTO item (id, name, created_by_user_id) 
    VALUES ('7b282e7a-5c3a-4781-952b-7adf906bc611', 'Bread', '9512fc06-496e-472f-bb9e-2da6f9243dd3');
 INSERT INTO serving 
    (
        name,
        plural,
        item_id, 
        created_by_user_id, 
        protein_grams,
        fat_grams,
        carb_grams
    ) 
    VALUES (
        'Slice', 
        'Slices', 
        '7b282e7a-5c3a-4781-952b-7adf906bc611', 
        '9512fc06-496e-472f-bb9e-2da6f9243dd3',
        1, 
        1,
        1
    );
 