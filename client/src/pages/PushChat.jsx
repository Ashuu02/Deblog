import React from 'react'

import * as PushAPI from "@pushprotocol/restapi";
import { Chat } from "@pushprotocol/uiweb";

function PushChat() {

  
  
    return (
    <>
        <h2>Push Chat test</h2>


                    <Chat
                    // account={account} //user address 
                    account= "0x88Ab2b62ccBD5170AA4D7266C0D5d7D002689fEf" //user address 
                    supportAddress="0xc221979949e0ACc4E1E715FbB232284f7eE412d4" //support address
                    // apiKey="jVPMCRom1B.iDRMswdehJG7NpHDiECIHwYMMv6k2KzkPJscFIDyW8TtSnk4blYnGa8DIkfuacU0"
                    apiKey="vzOQa8Hda3.lD6Yvrij1T4qHrE07Mp7XcE3mRWu8Yl6WAmOzLSfI63xWuGSoNkXsHeBDVvG63Hs"
                        env="staging"
        />

        
        
    </>
  )
}

export default PushChat;