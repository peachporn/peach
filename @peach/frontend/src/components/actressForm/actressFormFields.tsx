import { FunctionalComponent, h } from 'preact';
import { UseFormMethods } from 'react-hook-form';
import { ActressFormValues } from '../../domain/actress/types/actressFormValues';
import {
  cupsizes,
  eyecolors,
  genderExpressions,
  haircolors,
} from '../../domain/actress/types/appearance';
import { i } from '../../i18n/i18n';

type ActressFormFieldsProps = {
  form: UseFormMethods<ActressFormValues>;
  imageUrl?: string;
  className?: string;
};

const label = 'text-gray-400';

export const ActressFormFields: FunctionalComponent<ActressFormFieldsProps> = ({
  form,
  imageUrl,
  className,
}) => {
  const { register, watch } = form;
  const hasTits = watch('hasTits');

  return (
    <div className={`${className || ''}`}>
      <input
        className="input font-display text-2xl text-pink w-full col-span-2 mb-4"
        name="name"
        ref={register}
      />
      <div className="grid grid-cols-1 md:grid-cols-1/2 gap-x-4 items-start">
        <div className="grid grid-cols-1/2 items-start gap-y-2">
          <div className="w-full col-span-2">
            {!imageUrl ? null : <img className="w-full" src={imageUrl} alt="" />}
            <input className="input w-full" name="imageUrl" ref={register} />
          </div>
        </div>

        <div className="grid grid-cols-1/2 items-start gap-y-2">
          <label className={label} htmlFor="aliases">
            {i('ACTRESS_ALIASES')}
          </label>
          <input className="input" name="aliases" ref={register} />

          <label className={label} htmlFor="genderExpression">
            {i('ACTRESS_GENDER_EXPRESSION')}
          </label>
          <select className="input" name="genderExpression" ref={register}>
            {genderExpressions.map(genderExpression => (
              <option value={genderExpression}>{genderExpression}</option>
            ))}
          </select>

          <div className="col-span-2">
            <label className={`${label} block`}>{i('ACTRESS_EQUIPMENT')}</label>
            <label htmlFor={'hasDick'} className={'cursor-pointer inline-block'}>
              <input type="checkbox" id="hasDick" name="hasDick" ref={register} />
              <span className={'pl-1 mr-5'}>{i('EQUIPMENT_DICK')}</span>
            </label>
            <label htmlFor={'hasPussy'} className={'cursor-pointer inline-block'}>
              <input type="checkbox" id="hasPussy" name="hasPussy" ref={register} />
              <span className={'pl-1 mr-5'}>{i('EQUIPMENT_PUSSY')}</span>
            </label>
            <label htmlFor={'hasTits'} className={'cursor-pointer inline-block'}>
              <input type="checkbox" id="hasTits" name="hasTits" ref={register} />
              <span className={'pl-1'}>{i('EQUIPMENT_TITS')}</span>
            </label>
          </div>
          {!hasTits ? null : (
            <div className={'grid col-span-2 grid-cols-1/2'}>
              <label className={`${label}`} htmlFor="cupsize">
                {i('ACTRESS_CUPSIZE')}
              </label>
              <select className="input" name="cupsize" ref={register}>
                <option value={undefined}>{i('UNKNOWN')}</option>
                {cupsizes.map(cupsize => (
                  <option value={cupsize}>{cupsize}</option>
                ))}
              </select>

              <label className={label} htmlFor="hasImplants">
                {i('ACTRESS_IMPLANTS')}
              </label>
              <select className="input" name="hasImplants" ref={register}>
                <option value={undefined}>{i('UNKNOWN')}</option>
                <option value={'true'}>{i('YES')}</option>
                <option value={'false'}>{i('NO')}</option>
              </select>
            </div>
          )}

          <label className={label} htmlFor="haircolor">
            {i('ACTRESS_HAIRCOLOR')}
          </label>
          <select className="input" name="haircolor" ref={register}>
            <option value={undefined}>{i('UNKNOWN')}</option>
            {haircolors.map(haircolor => (
              <option value={haircolor}>{haircolor}</option>
            ))}
          </select>

          <label className={label} htmlFor="eyecolor">
            {i('ACTRESS_EYECOLOR')}
          </label>
          <select className="input" name="eyecolor" ref={register}>
            <option value={undefined}>{i('UNKNOWN')}</option>
            {eyecolors.map(eyecolor => (
              <option value={eyecolor}>{eyecolor}</option>
            ))}
          </select>

          <label className={label} htmlFor="height">
            {i('ACTRESS_HEIGHT')}
          </label>
          <input className="input" name="height" ref={register} />

          <label className={label} htmlFor="weight">
            {i('ACTRESS_WEIGHT')}
          </label>
          <input className="input" name="weight" ref={register} />

          <div className="col-span-2 grid grid-cols-3">
            <label className={label} htmlFor="measurements.bust">
              {i('ACTRESS_MEASUREMENTS_BUST')}
            </label>
            <label className={label} htmlFor="measurements.waist">
              {i('ACTRESS_MEASUREMENTS_WAIST')}
            </label>
            <label className={label} htmlFor="measurements.hips">
              {i('ACTRESS_MEASUREMENTS_HIPS')}
            </label>
            <input className="input" name="measurements.bust" ref={register} />
            <input className="input" name="measurements.waist" ref={register} />
            <input className="input" name="measurements.hips" ref={register} />
          </div>

          <label className={`${label} col-span-2`} htmlFor="piercings">
            {i('ACTRESS_PIERCINGS')}
          </label>
          <textarea className="input col-span-2" name="piercings" ref={register} />

          <label className={`${label} col-span-2`} htmlFor="tattoos">
            {i('ACTRESS_TATTOOS')}
          </label>
          <textarea className="input col-span-2" name="tattoos" ref={register} />

          <label className={`${label} mt-4`} htmlFor="dateOfBirth">
            {i('ACTRESS_BORN')}
          </label>
          <input type="date" className="input mt-4" name="dateOfBirth" ref={register} />

          <label className={label} htmlFor="dateOfCareerstart">
            {i('ACTRESS_STARTED')}
          </label>
          <input type="date" className="input" name="dateOfCareerstart" ref={register} />

          <label className={label} htmlFor="dateOfRetirement">
            {i('ACTRESS_RETIRED')}
          </label>
          <input type="date" className="input" name="dateOfRetirement" ref={register} />

          <label className={label} htmlFor="dateOfDeath">
            {i('ACTRESS_DECEASED')}
          </label>
          <input type="date" className="input" name="dateOfDeath" ref={register} />

          <label className={`${label} mt-4`} htmlFor="city">
            {i('ACTRESS_CITY')}
          </label>
          <input className="input mt-4" name="city" ref={register} />

          <label className={label} htmlFor="province">
            {i('ACTRESS_PROVINCE')}
          </label>
          <input className="input" name="province" ref={register} />

          <label className={label} htmlFor="country">
            {i('ACTRESS_COUNTRY')}
          </label>
          <input className="input" name="country" ref={register} />
          <label className={`${label} mt-4`} htmlFor="officialWebsite">
            {i('ACTRESS_OFFICIAL_WEBSITE')}
          </label>
          <input className="input mt-4" name="officialWebsite" ref={register} />

          <label className={`${label} col-span-2`} htmlFor="socialMediaLinks">
            {i('ACTRESS_SOCIALMEDIA_LINKS')}
          </label>
          <textarea className="input col-span-2" name="socialMediaLinks" ref={register} />
        </div>
      </div>
    </div>
  );
};
