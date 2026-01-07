import React,{useState} from 'react'
import { Button, Flex } from "antd";
export const ButtonLoading = ({ name, isLoading, handvalueclick, ...props}) => {
      const [loadings, setLoadings] = useState([]);
    
      const enterLoading = (index) => {
     
    
        setLoadings((prevLoadings) => {
          const newLoadings = [...prevLoadings];
          newLoadings[index] = true;
          return newLoadings;
        });
        setTimeout(() => {
          setLoadings((prevLoadings) => {
            const newLoadings = [...prevLoadings];
            newLoadings[index] = false;
            return newLoadings;
          });
        }, 1200);
      };
  return (
    <Flex gap="small" vertical align="center">
          <Flex gap="small" wrap>
            <Button
              {...props}
              type="primary"
              loading={loadings[isLoading]}
              onClick={() => {handvalueclick?.();
                            enterLoading(isLoading)}}
            >
              {name || 'button'}
            </Button>
          </Flex>
        </Flex>
  )
}
