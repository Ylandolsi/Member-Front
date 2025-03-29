import { useEffect, useRef } from 'react';
import './SecondVerif.scss';
interface SecondVerifProps {
  apiUrl: string;
  secondVerify: boolean;
  setSecondVerify: (value: boolean) => void;
}

export function SecondVerif({
  apiUrl,
  secondVerify,
  setSecondVerify,
}: SecondVerifProps) {
  const textAreaRef = useRef<HTMLInputElement>(null);

  const fetchSecondVerify = async () => {
    fetch(`${apiUrl}/User/check-completion`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.secondVerify) {
          setSecondVerify(true);
        }
      })
      .catch((error) => console.error('Error:', error));
  };

  useEffect(() => {
    fetchSecondVerify();
  }, []);

  const handleSecondVerify = async () => {
    const accessToken = localStorage.getItem('accessToken');
    const response = await fetch(`${apiUrl}/User/complete-action`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ action: 'secondVerify' }),
    });
    if (response.ok) {
      const data = await response.json();
      console.log('Second verification completed:', data);
      setSecondVerify(true);
      localStorage.setItem('secondVerify', 'true');
    } else {
      console.error(
        'Error completing second verification:',
        response.statusText
      );
    }
  };

  const handleCheck = async () => {
    if (textAreaRef.current && textAreaRef.current.value === 'Palestine') {
      handleSecondVerify();
    }
  };

  return (
    <div className="second-verif">
      {secondVerify ? (
        <div>
          <h2>Second verification completed</h2>
          <p>You have successfully completed the second verification.</p>
        </div>
      ) : (
        <div>
          <h2>Second verification:</h2>
          <p>Write Palestine in this box:</p>
          <div className="FlexArea">
            <input placeholder="Palestine" ref={textAreaRef} />
            <button onClick={handleCheck}>Check</button>
          </div>
        </div>
      )}
    </div>
  );
}
