export type ActressFormValues = {
  name: string;
  imageUrl: string;
  aliases: string;

  dateOfBirth: string;
  dateOfCareerstart: string;
  dateOfRetirement: string;
  dateOfDeath: string;

  genderExpression: string;
  haircolor: string;
  eyecolor: string;

  hasTits: boolean;
  cupsize: string;
  hasImplants: 'true' | 'false' | 'unknown';

  hasDick: boolean;
  hasPussy: boolean;

  height: string;
  weight: string;
  measurements: {
    chest: string;
    waist: string;
    hips: string;
  };

  piercings: string;
  tattoos: string;

  city: string;
  province: string;
  country: string;

  officialWebsite: string;
  socialMediaLinks: string;
};
