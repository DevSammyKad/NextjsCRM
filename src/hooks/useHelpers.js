import { useState } from "react";

const useHelpers = () => {
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState("");

  return { loading, setLoading, open, setOpen, selected, setSelected };
};

export default useHelpers;
