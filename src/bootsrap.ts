import Joi from 'joi';

const envSchema = Joi.object({
  port: Joi.number().default(3000),
  supabaseUrl: Joi.string().uri().required(),
  supabaseAnonKey: Joi.string().required(),
  supabaseApiKey: Joi.string().required(),
  jwtSecret: Joi.string().min(16).required(),
  newUserSignUpSecretKey: Joi.string().min(32).required(),
});

export default async function () {
  const {
    PORT: port,
    SECRET_JWT: jwtSecret,
    SUPABASE_URL: supabaseUrl,
    SUPABASE_ANON_KEY: supabaseAnonKey,
    SUPABASE_API_KEY: supabaseApiKey,
    SECRET_SIGNUP: newUserSignUpSecretKey,
  } = process.env;

  try {
    await envSchema.validateAsync({
      port,
      supabaseUrl,
      supabaseAnonKey,
      supabaseApiKey,
      jwtSecret,
      newUserSignUpSecretKey,
    });
  } catch (err: any) {
    console.log(err.details[0].message);

    process.exit(1);
  }
}
