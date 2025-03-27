import { useForm, DefaultValues } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

function useFormWithZod<TSchema extends z.ZodType<any, any>>(
  schema: TSchema,
  defaultValues?: Partial<z.infer<TSchema>>
) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
    control,
    watch,
  } = useForm<z.infer<TSchema>>({
    resolver: zodResolver(schema),
    defaultValues: defaultValues as DefaultValues<z.infer<TSchema>>,
  });

  return {
    register,
    handleSubmit,
    errors,
    reset,
    setValue,
    control,
    watch,
  };
}

export default useFormWithZod;
