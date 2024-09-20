import React, { useState } from 'react';

function Rules(instance) {
    
    const [expanded, setExpanded] = useState(null);
    if (instance === null) { return (<div>Loading</div>); }

    const toggleExpanded = (index) => {
        setExpanded(expanded === index ? null : index);
    };

    if (instance === null) { return (<div>Loading</div>); }
    return (
        <div className="my-24">
            <h2 className="subtitle">
                Our Rules
            </h2>
            <ul className="grid gap-x-8 gap-y-12 my-16 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
                {instance.rules.map((rule, index) => (
                    <li key={index} className="text-md mb-4">
                        <span className="block text-2xl mb-4 cursor-pointer" onClick={() => toggleExpanded(index)}>
                            Rule #{index + 1}
                        </span>
                        <span className="block text-lg dark:text-white tracking-widest leading-8">{rule.text}</span>
                        <div className={`accordion-content ${expanded === index ? 'expanded' : ''}`}>
                            <span className="block text-md dark:text-gray-400 pt-2">{rule.hint}</span>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
}

// function Rules({ getInstance }) {
//     const [instance, setInstance] = useState(null);
//     const [openIndex, setOpenIndex] = useState(null);

//     useEffect(() => {
//         async function fetchInstance() {
//             const data = await getInstance();
//             setInstance(data);
//         }
//         fetchInstance();
//     }, [getInstance]);

//     if (instance === null) {
//         return (<div>Loading...</div>);
//     }

//     const toggleHint = (index) => {
//         setOpenIndex(openIndex === index ? null : index);
//     };

//     return (
//         <div className="my-24">
//             <h2 className="subtitle">
//                 Our Rules
//             </h2>
//             <ul className="grid gap-x-8 gap-y-12 my-16 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
//                 {instance.rules.map((rule, index) => (
//                     <li key={index} className="text-md mb-4">
//                         <span className="block text-2xl mb-4">Rule #{index + 1}</span>
//                         <span
//                             className="block text-lg dark:text-white tracking-widest leading-8 mb-4 cursor-pointer"
//                             onClick={() => toggleHint(index)}
//                         >
//                             {rule.text}
//                         </span>
//                         <div
//                             className={`transition-max-height duration-500 ease-in-out ${
//                                 openIndex === index ? 'max-h-screen' : 'max-h-0'
//                             } overflow-hidden`}
//                         >
//                             <span className="block text-md dark:text-white tracking-widest leading-6 pl-4">
//                                 {rule.hint}
//                             </span>
//                         </div>
//                     </li>
//                 ))}
//             </ul>
//         </div>
//     );
// }

export default Rules;