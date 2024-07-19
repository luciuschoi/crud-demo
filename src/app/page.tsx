import Image from "next/image";
import Rhf from '@/components/Rhf'
// import SimpleForm from '@/components/SimpleForm'
// import SimpleFormWithAction from '@/components/SimpleFormWithAction'

export default function Home() {
  return (
    <div>
      <h1 className='text-2xl font-semibold mb-2'>CRUD Demo - React Hook Form</h1>
      {/* <SimpleForm /> */}
      {/* <SimpleFormWithAction /> */}
      <Rhf />
    </div>
  );
}
