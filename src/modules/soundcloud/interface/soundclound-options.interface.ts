import { FactoryProvider, ModuleMetadata } from "@nestjs/common";

export const SoundcloundOptionsSymbol = Symbol("SOUNDCLOUND_OPTIONS");

export type ISoundcloundOptions = {
  client_id: string;
  redirect_uri: string;
  client_secret: string;
};

export type ISoundcloundAsyncOptions = Pick<ModuleMetadata, "imports"> &
  Pick<FactoryProvider<ISoundcloundOptions>, "useFactory" | "inject">;
