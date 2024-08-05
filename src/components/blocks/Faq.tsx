import {
  Accordion,
  AccordionContent,
  AccordionHeader,
  AccordionItem,
  AccordionTrigger,
} from '@/lib/components/Accordion';
import { PayloadBlockFaq } from '@/lib/types/payload';

import Serialize from '../Serialize';

export default function BlockFaq({ faqs }: PayloadBlockFaq) {
  return (
    <Accordion type={faqs.length === 1 ? 'single' : 'multiple'}>
      {faqs.map(({ question, answer, id }) => (
        <AccordionItem value={id} key={id}>
          <AccordionHeader asChild>
            <h2>
              <AccordionTrigger>{question}</AccordionTrigger>
            </h2>
          </AccordionHeader>
          <AccordionContent>{answer?.root?.children && <Serialize nodes={answer.root.children} />}</AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}
