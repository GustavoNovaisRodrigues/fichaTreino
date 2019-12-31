export interface Usuario {
 uid: string ;
 email: string;
 dataModificacao?: Date;
 verificado: boolean;
 nivel: string;
 displayName?: string;
 displayNameCaseSensitive?: string;
 photoURL?: string;
 idade?: number;
 genero?: string;
 redesSociais?: {
  instagram: string;
  facebook: string;
  twitter: string;
 };
 treinos?: [];
}
