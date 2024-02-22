"use client"
import React from "react";
import { useRouter } from "next/navigation";
import { Button } from '@mui/material';
import styles from '../app/tourcreation/tourcreation.css'

export default function Home() {
  const router = useRouter();

  const handleCreate = () => {
    router.refresh();
    router.push("/tourcreation");
  };
      return (
    <div>
      <h1>Welcome to the Tour App</h1>
      <Button className='submitButton' type="submit" variant="contained" color='success' onClick={handleCreate}>
            Create Tour
      </Button>
    </div>
  );
}
