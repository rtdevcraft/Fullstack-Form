import ContactForm from '@/components/ContactForm'

export default function Home() {
  return (
    <div className='grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-4 pb-10 md:p-8 md:pb-20 md:p-20 gap-8 md:gap-16'>
      <main className='flex flex-col gap-[32px] row-start-2 items-center w-full'>
        <ContactForm />
      </main>
    </div>
  )
}
