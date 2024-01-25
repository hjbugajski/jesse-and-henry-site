import Image from 'next/image';
import Link from 'next/link';

import { Button } from '@/lib/components/Button';
import { Dialog, DialogContent, DialogTrigger } from '@/lib/components/Dialog';
import { Icon } from '@/lib/components/Icon';

const IconCheck = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24" className={className}>
    <title>Check</title>
    <path
      fill="currentColor"
      d="M280-360h240l80-80H280q-17 0-28.5 11.5T240-400q0 17 11.5 28.5T280-360Zm0-160h160q17 0 28.5-11.5T480-560q0-17-11.5-28.5T440-600H280q-17 0-28.5 11.5T240-560q0 17 11.5 28.5T280-520Zm80 320H160q-33 0-56.5-23.5T80-280v-400q0-33 23.5-56.5T160-760h640q33 0 56.5 23.5T880-680v40h-80v-40H160v400h280l-80 80Zm556-268q5 5 5 11t-5 11l-36 36-70-70 36-36q5-5 11-5t11 5l48 48Zm-60 82L602-132q-6 6-13.5 9t-15.5 3h-33q-8 0-14-6t-6-14v-33q0-8 3-15.5t9-13.5l254-254 70 70ZM160-680v400-400Z"
    />
  </svg>
);

const IconPayPal = ({ className }: { className?: string }) => (
  <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className={className}>
    <title>PayPal</title>
    <path
      fill="currentColor"
      d="M7.016 19.198h-4.2a.562.562 0 0 1-.555-.65L5.093.584A.692.692 0 0 1 5.776 0h7.222c3.417 0 5.904 2.488 5.846 5.5-.006.25-.027.5-.066.747A6.794 6.794 0 0 1 12.071 12H8.743a.69.69 0 0 0-.682.583l-.325 2.056-.013.083-.692 4.39-.015.087zM19.79 6.142c-.01.087-.01.175-.023.261a7.76 7.76 0 0 1-7.695 6.598H9.007l-.283 1.795-.013.083-.692 4.39-.134.843-.014.088H6.86l-.497 3.15a.562.562 0 0 0 .555.65h3.612c.34 0 .63-.249.683-.585l.952-6.031a.692.692 0 0 1 .683-.584h2.126a6.793 6.793 0 0 0 6.707-5.752c.306-1.95-.466-3.744-1.89-4.906z"
    />
  </svg>
);

const IconVenmo = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 22 25" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <title>Venmo</title>
    <path
      fill="currentColor"
      d="M20.527 0.917969C21.3712 2.30466 21.75 3.73454 21.75 5.54027C21.75 11.2992 16.816 18.7782 12.8115 24.0295H3.66683L0 2.17963L8.00984 1.42188L9.95772 16.9687C11.7679 14.0271 14.0064 9.40482 14.0064 6.25559C14.0064 4.53018 13.7097 3.35718 13.2458 2.39104L20.527 0.917969Z"
    ></path>
  </svg>
);

const IconZelle = ({ className }: { className?: string }) => (
  <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className={className}>
    <title>Zelle</title>
    <path
      fill="currentColor"
      d="M13.559 24h-2.841a.483.483 0 0 1-.483-.483v-2.765H5.638a.667.667 0 0 1-.666-.666v-2.234a.67.67 0 0 1 .142-.412l8.139-10.382h-7.25a.667.667 0 0 1-.667-.667V3.914c0-.367.299-.666.666-.666h4.23V.483c0-.266.217-.483.483-.483h2.841c.266 0 .483.217.483.483v2.765h4.323c.367 0 .666.299.666.666v2.137a.67.67 0 0 1-.141.41l-8.19 10.481h7.665c.367 0 .666.299.666.666v2.477a.667.667 0 0 1-.666.667h-4.32v2.765a.483.483 0 0 1-.483.483Z"
    />
  </svg>
);

const DialogCheck = () => (
  <div className="flex justify-center">
    <div className="flex flex-col gap-2">
      <div className="flex flex-row gap-2">
        <Icon name="person" className="shrink-0 text-xl leading-6" />
        <p>Henry Bugajski</p>
      </div>
      <div className="flex flex-row gap-2">
        <Icon name="home" className="shrink-0 text-xl leading-6" />
        <div>
          <p>2840 Jackson Ave</p>
          <p>Apt 38P</p>
          <p>Long Island City, NY 11101</p>
        </div>
      </div>
    </div>
  </div>
);

const DialogPayPal = () => (
  <div className="flex flex-col items-center justify-center">
    <div className="flex max-w-56 items-center justify-center rounded-xl bg-white p-2">
      <Image src="/images/paypal-qr.jpeg" width={524} height={524} alt="PayPal QR Code" />
    </div>
    <p className="my-2">
      <strong>@hbugajski</strong>
    </p>
    <Button asChild iconPosition="right" variant="solid" className="mt-4 w-48">
      <Link href="https://paypal.me/hbugajski">
        Send
        <Icon name="send" />
      </Link>
    </Button>
  </div>
);

const DialogVenmo = () => (
  <div className="flex flex-col items-center justify-center">
    <div className="flex max-w-56 items-center justify-center rounded-xl bg-white p-2">
      <Image src="/images/venmo-qr.jpeg" width={575} height={575} alt="Venmo QR Code" />
    </div>
    <p className="my-2">
      <strong>@henrybug</strong>
    </p>
    <Button asChild iconPosition="right" variant="solid" className="mt-4 w-48">
      <Link href="https://venmo.com/u/henrybug">
        Send
        <Icon name="send" />
      </Link>
    </Button>
  </div>
);

const DialogZelle = () => (
  <div className="flex flex-col items-center">
    <p className="mb-4 text-balance text-center">Get started through your mobile banking app or with the Zelle app.</p>
    <div className="flex flex-col gap-2">
      <div className="flex flex-row items-center gap-2">
        <Icon name="call" className="shrink-0 text-xl leading-6" />
        <p>(708) 927-9467</p>
      </div>
      <div className="flex flex-row items-center gap-2">
        <Icon name="mail" className="shrink-0 text-xl leading-6" />
        <p>hbugajski@gmail.com</p>
      </div>
    </div>
  </div>
);

export default function BlockRegistry() {
  const paymentMethods = [
    {
      name: 'Zelle',
      icon: IconZelle,
      dialogContent: DialogZelle,
    },
    {
      name: 'Venmo',
      icon: IconVenmo,
      dialogContent: DialogVenmo,
    },
    {
      name: 'PayPal',
      icon: IconPayPal,
      dialogContent: DialogPayPal,
    },
    {
      name: 'Check',
      icon: IconCheck,
      dialogContent: DialogCheck,
    },
  ];

  return (
    <ul className="my-6 grid grid-cols-2 gap-4 first:mt-0 last:mb-0 md:grid-cols-4">
      {paymentMethods.map((method, i) => (
        <li key={i}>
          <Dialog>
            <DialogTrigger asChild>
              <Button className="flex h-auto w-full flex-col items-center justify-center gap-2 p-4">
                <method.icon className="size-8" />
                {method.name}
              </Button>
            </DialogTrigger>
            <DialogContent>
              <div>
                <div className="mb-4 flex h-auto w-full flex-col items-center justify-center gap-2">
                  <method.icon className="size-8" />
                  <h1 className="font-sans text-lg font-bold normal-case tracking-normal">{method.name}</h1>
                </div>
                {method.dialogContent && <method.dialogContent />}
              </div>
            </DialogContent>
          </Dialog>
        </li>
      ))}
    </ul>
  );
}
