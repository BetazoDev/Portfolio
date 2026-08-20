UPDATE "users"
SET "password_hash" = '$2b$12$Pu1N5y9gpjq0F1JwB4qbauUzMDTvAD241pegYVBspM73fH1.mJdFO', "updated_at" = CURRENT_TIMESTAMP
WHERE "email" = 'admin@halonso.digital';
