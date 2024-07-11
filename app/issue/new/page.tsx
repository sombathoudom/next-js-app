// import IssueForm from '../_components/IssueForm';
import IssueFormSkeleton from './loading';
import dynamic from 'next/dynamic';
const IssueForm = dynamic(() => import('@/app/issue/_components/IssueForm'), {ssr: false, loading:() => <IssueFormSkeleton/>});
const NewIssuePage = () => {
  return (
    <IssueForm/>
  )
}

export default NewIssuePage