export const Contact = ({name, phone}) => {
    return <div>{name} - {phone}</div>
}

// export const Contacts = ({ id, name, number }) => {
//     return (
//       <ul>
//         {state.contacts.map(contact => (
//           <li key={id}>
//             {name} - {number}
//           </li>
//         ))}
//       </ul>
//     );
//   };