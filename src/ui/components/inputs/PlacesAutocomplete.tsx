import { Combobox, Skeleton, TextInput, useCombobox } from "@mantine/core";
import { UseFormReturnType } from "@mantine/form";
import { useApiIsLoaded } from "@vis.gl/react-google-maps";
import usePlacesAutocomplete, {
  getGeocode,
  getLatLng,
} from "use-places-autocomplete";

import { RegistrationFormSchema } from "@/backend/features/register/validator";

interface PlacesAutocompleteProps {
  form: UseFormReturnType<RegistrationFormSchema>;
  name: string;
  label?: string;
  placeholder: string;
  onCoordinatesSelect?: (position: { lat: number; lng: number }) => void;
}

interface PlacesAutocompleteSpreadProps {
  value?: string;
  defaultValue?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onFocus?: (event: React.FocusEvent<HTMLInputElement>) => void;
  onBlur?: (event: React.FocusEvent<HTMLInputElement>) => void;
  error?: string;
}

function PlacesAutocomplete({
  form,
  name,
  label,
  placeholder,
  onCoordinatesSelect: notifyCoordinatesSelect,
}: PlacesAutocompleteProps) {
  const isLoaded = useApiIsLoaded();

  if (!isLoaded) {
    return (
      <Skeleton className="h-15 w-full before:bg-light-700 after:bg-light-600" />
    );
  }

  return (
    <PlacesAutocompleteInput
      id={name}
      name={name}
      key={form.key(name)}
      {...form.getInputProps(name)}
      label={label}
      placeholder={placeholder}
      onCoordinatesSelect={(args) => {
        form.setFieldValue(name, {
          longtitude: args.lng,
          latitude: args.lat,
        });
        if (notifyCoordinatesSelect) {
          notifyCoordinatesSelect(args);
        }
      }}
    />
  );
}

function PlacesAutocompleteInput({
  id,
  name,
  label,
  placeholder,
  onCoordinatesSelect,
  onBlur,
  onFocus,
  error,
}: {
  onCoordinatesSelect: (args: { lat: number; lng: number }) => void;
} & PlacesAutocompleteSpreadProps & {
    id: string;
    name: string;
    label?: string;
    placeholder: string;
  }) {
  const {
    ready,
    value,
    setValue,
    suggestions: { status, data },
    clearSuggestions,
  } = usePlacesAutocomplete();

  const combobox = useCombobox({
    onDropdownClose: () => combobox.resetSelectedOption(),
  });

  async function handleCoordinatesSelect(address: string) {
    setValue(address, false);
    clearSuggestions();

    const results = await getGeocode({ address });
    const { lat, lng } = await getLatLng(results[0]);
    onCoordinatesSelect({ lat, lng });
  }

  return (
    <Combobox
      onOptionSubmit={(address) => {
        handleCoordinatesSelect(address);
        combobox.closeDropdown();
      }}
      store={combobox}
    >
      <Combobox.Target>
        <TextInput
          id={id}
          name={name}
          label={label}
          placeholder={placeholder}
          value={value}
          onChange={(e) => {
            setValue(e.currentTarget.value);
            combobox.openDropdown();
          }}
          onClick={() => combobox.openDropdown()}
          onFocus={(e) => {
            combobox.openDropdown();
            if (onFocus) {
              onFocus(e);
            }
          }}
          onBlur={(e) => {
            combobox.closeDropdown();
            if (onBlur) {
              onBlur(e);
            }
          }}
          error={error}
          disabled={!ready}
          required
        />
      </Combobox.Target>

      <Combobox.Dropdown>
        <Combobox.Options>
          {status === "OK" &&
            data.length > 0 &&
            data.map(({ place_id, description }) => (
              <Combobox.Option key={place_id} value={description}>
                {description}
              </Combobox.Option>
            ))}
          {(status !== "OK" || data.length === 0) && (
            <Combobox.Empty>Enter an address</Combobox.Empty>
          )}
        </Combobox.Options>
      </Combobox.Dropdown>
    </Combobox>
  );
}

export default PlacesAutocomplete;
