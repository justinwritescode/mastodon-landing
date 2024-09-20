import React, { useState, useEffect } from 'react';
import { Disclosure } from '@headlessui/react';
import { MinusIcon, PlusIcon } from '@heroicons/react/24/outline';

export default function FAQ(instance) {
  if (instance === null) { return (<div>Loading</div>); }
  const faqs = instance.faqs;
  // const [faqs, setFaqs] = useState([]);

  // useEffect(() => {
  //   const fetchFaqs = async () => {
  //     try {
  //       const response = await fetch(`${API_ENDPOINT}/api/vnext/faqs`);
  //       const data = await response.json();

  //       // Assuming the format of FAQ data will be within the 'rules' attribute
  //       const faqs = data.rules.map(rule => ({
  //         question: rule.text,
  //         answer: rule.description || "No detailed description available."
  //       }));

  //       setFaqs(faqs);
  //     } catch (error) {
  //       console.error('Error fetching the FAQs:', error);
  //     }
  //   };

  //   fetchFaqs();
  // }, []);

  return (
    <div className="divide-y divide-gray-400/10">
      <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Frequently asked questions</h2>
      <dl className="mt-10 space-y-6 divide-y divide-gray-400/10">
        {faqs.map((faq) => (
          <Disclosure as="div" key={faq.question} className="pt-6">
            {({ open }) => (
              <>
                <dt>
                  <Disclosure.Button className="flex w-full items-start justify-between text-left">
                    <span className="text-lg font-bold leading-7">{faq.question}</span>
                    <span className="ml-6 flex h-7 items-center">
                      {open ? (
                        <MinusIcon className="h-5 w-5" aria-hidden="true" />
                      ) : (
                        <PlusIcon className="h-5 w-5" aria-hidden="true" />
                      )}
                    </span>
                  </Disclosure.Button>
                </dt>
                <Disclosure.Panel as="dd" className="mt-2 pr-12">
                  <p className="text-md leading-7 dark:text-white my-4">{faq.answer}</p>
                </Disclosure.Panel>
              </>
            )}
          </Disclosure>
        ))}
      </dl>
    </div>
  );
}