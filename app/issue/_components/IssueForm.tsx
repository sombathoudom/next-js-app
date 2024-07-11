'use client';
import React, { useState } from 'react'
import {useForm, Controller} from 'react-hook-form';
import dynamic from 'next/dynamic';
import { TextField, Button, Callout } from '@radix-ui/themes';
//import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { zodResolver } from '@hookform/resolvers/zod';
import { issueSchema } from '@/app/validationSchemas';
import ErrorMessage from '@/app/components/ErrorMessage';
import Spinner from '@/app/components/Spinner';
import { z } from 'zod';
import { Issue } from '@prisma/client';


const SimpleMDE = dynamic(() => import('react-simplemde-editor'), {
  ssr: false,
});

type IssueFormData = z.infer<typeof issueSchema>;
// interface Props {
//   issue?: Issue
// }
const IssueForm = ({issue}: {issue?: Issue}) => {

  const router = useRouter();
  const {register, control, handleSubmit, formState: {errors}} = useForm<IssueFormData>({resolver: zodResolver(issueSchema)});
  const [error, setError] = useState('');
  const [isSubmitting, setSubmitting] = useState(false);

  const onSubmit = handleSubmit(async (data) => {
    try {
      setSubmitting(true);
      if(issue) {
        await axios.patch(`/api/issues/${issue.id}`, data);
      }else {
        await axios.post('/api/issues', data);
      }
     
      router.push('/issue');
    } catch (error) {
      console.log(error);
      
      setSubmitting(false);
      setError('AN unxpected error occured');
    }
  });

  return (
    <div className='max-w-xl'>
      {error && <Callout.Root color='red' className='mb-5'>
        <Callout.Text>{error}</Callout.Text>  </Callout.Root>}
      <form className=' space-y-3' 
        onSubmit={onSubmit}>
        <TextField.Root placeholder='Title' {...register('title')} defaultValue={issue?.title} ></TextField.Root>
        <ErrorMessage>{errors.title?.message}</ErrorMessage>
        <Controller
          defaultValue={issue?.description}
          name="describe"
          control={control}
          render={({ field }) => <SimpleMDE {...field}/>}
        >
        </Controller>
        <ErrorMessage>{errors.describe?.message}</ErrorMessage>

        <Button disabled={isSubmitting}>  {issue ? 'Update Issue' : 'Submit New Issue'}{isSubmitting && <Spinner />} </Button>
      </form>
    </div>
  )
}

export default IssueForm