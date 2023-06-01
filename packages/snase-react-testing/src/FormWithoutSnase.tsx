import { FC, useState } from "react";

export const FormWithoutSnase: FC = () => {
  const [firstName, setFirstName] = useState("");
  const [kalasBing, setKalasBing] = useState("");
  const [kalasBong, setKalasBong] = useState("");

  return (
    <div>
      <h1>Without Snase</h1>
      <input
        type="text"
        value={firstName}
        onChange={(ev) => setFirstName(ev.target.value)}
      />
      <input
        type="text"
        value={kalasBing}
        onChange={(ev) => setKalasBing(ev.target.value)}
      />
      <input
        type="text"
        value={kalasBong}
        onChange={(ev) => setKalasBong(ev.target.value)}
      />
    </div>
  );
};
