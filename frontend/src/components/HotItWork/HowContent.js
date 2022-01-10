import React from "react";
import "./HowContent.css";
import { Collapse } from "antd";

const { Panel } = Collapse;

const HowContent = () => {

  return (
    <div className="how-content">
      <div className="how-collapse-content">
        <div>
          <h2>Marketplace</h2>
          <Collapse defaultActiveKey={["0"]} onChange={() => {}}>
            <Panel header="NFT? ERC-721 tokens?">
              <p>NFT stands for non-fungible tokens like ERC-721 (a smart contract standard) tokens which are hosted on Ethereum’s own blockchain. NFTs are unique digital items such as collectibles or artworks or game items. As an artist, by tokenizing your work you both ensure that it is unique and brand it as your work. The actual ownership is blockchain-managed. If you want to go in-depth into NFTs, I suggest this read: [https://opensea.io/blog/guides/non-fungible-tokens/](https://opensea.io/blog/guides/non-fungible-tokens/)</p>
            </Panel>
            <Panel header="What does “minting” mean?">
              <p>The process of tokenizing your work and creating an NFT (see above).</p>
            </Panel>
          </Collapse>
        </div>
      </div>
      <div className="how-collapse-content">
        <div>
          <h2>Governance</h2>
          <Collapse defaultActiveKey={["1"]} onChange={() => {}}>
            <Panel header="What is the purpose of HTZ as a governance">
              <p>HTZ Will be the native governance token of the NFT platform “TheXdao”, designed to reward active platform users with a voice on the platform’s future.. HTZ has been created to give the community the power to influence decisions and incentivize active participation,other benefits for holding HTZ is you will pay less fees on the marketplace and get access to a private designers panel & much more Benefits!</p>
            </Panel>          
          </Collapse>
        </div>
      </div>
    </div>
  );
};

export default HowContent;
