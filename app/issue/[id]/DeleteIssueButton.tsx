'use client'
import { AlertDialog, Button, Flex } from '@radix-ui/themes'
import React, { useState } from 'react'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import Spinner from '@/app/components/Spinner'
const DeleteIssueButton = ({issueId}: {issueId: number}) => {
    const router = useRouter();
    const [error , setError] = useState(false);
    const [isDeleting, setDeleting] = useState(false);
  return (
    <>
    <AlertDialog.Root>
        <AlertDialog.Trigger>
        <Button color='red' disabled={isDeleting}> 
            Delete Issue
            {isDeleting && <Spinner/>}
        </Button>
        </AlertDialog.Trigger>
        <AlertDialog.Content>
        <AlertDialog.Title>
          Delete Issue
        </AlertDialog.Title>
        <AlertDialog.Description>
          Are you sure you want to delete this issue?
        </AlertDialog.Description>
        <Flex mt="4" gap="3">
          <AlertDialog.Cancel>
            <Button color='gray' variant='soft'>Cancel</Button>
          </AlertDialog.Cancel>
          <AlertDialog.Action>
          <Button color='red' onClick={async () => {
            try {
                setDeleting(true);
                await axios.delete('/api/issues/' + issueId);
                router.push('/issue'); 
                router.refresh();
            } catch (error) {
                setError(true);
            }
           
          }}>Delete Issue</Button>
          </AlertDialog.Action>
        </Flex>
        {/* <AlertDialog.Action asChild>
          <Button color='red'>Delete</Button>
        </AlertDialog.Action>
        <AlertDialog.Cancel asChild>
          <Button color='gray'>Cancel</Button> */}
        </AlertDialog.Content>
    </AlertDialog.Root>

    <AlertDialog.Root open={error}>
        <AlertDialog.Content>
        <AlertDialog.Title>
        Error
        </AlertDialog.Title>
        <AlertDialog.Description>
        Something went wrong
        </AlertDialog.Description>
        <AlertDialog.Cancel>
        <Button color='gray' variant='soft' mt="2" onClick={() => setError(false)}>Close</Button>
        </AlertDialog.Cancel>
        </AlertDialog.Content>
    </AlertDialog.Root>
    </>
   
  )
}

export default DeleteIssueButton