import * as React from 'react';
import { Contract } from '@ethersproject/contracts'
import $ from 'jquery';
import jQueryBridget from 'jquery-bridget';
import Isotope from 'isotope-layout';
import 'isotope-cells-by-row';


import TokenABI from '../contracts/Token.json'
import TheXdaoNFTABI from '../contracts/TheXdaoNFT.json'
import TheXdaoMarketABI from '../contracts/TheXdaoMarket.json'
import TheXdaoAuctionABI from '../contracts/TheXdaoAuction.json'

function SortingCard() {
      jQueryBridget( 'isotope', Isotope, $ );

      var portfolioIsotope = $('.dream-portfolio').isotope({
        itemSelector: '.single_gallery_item',
        layoutMode: 'fitRows'
      });

      $('.portfolio-menu button').on('click', function() {
        $(".portfolio-menu button").removeClass('active');
        $(this).addClass('active');

        portfolioIsotope.isotope({
          filter: $(this).data('filter')
        });
      });
}

function Addshrink() {
    let RelBanner = document.querySelector('#banner');

    window.addEventListener("scroll", e => {
        if(window.pageYOffset > 86){
          RelBanner.classList.add("shrink");
        }else
        {
            RelBanner.classList.remove("shrink");
        }
    });
}

function loader() {
    var fadeTarget = document.getElementById("preloader");

    function fadeOutEffect() {
        
        var fadeEffect = setInterval(function () {
            if (fadeTarget.style.opacity > 0) {
                fadeTarget.style.opacity -= 0.1;
            } else {
                clearInterval(fadeEffect);
                fadeTarget.style.display = 'none'
            }
        }, 100);
    }

    window.onload = setTimeout(fadeOutEffect , 1000)
}

export {
    SortingCard,
    Addshrink,
    loader
};


export const currentNetwork = process.env.REACT_APP_NETWORK_ID;

export const CONTRACTS_BY_NETWORK = {
  [currentNetwork]: {
    Token: {
      address: '0x68F7880F7af43a81bEf25E2aE83802Eb6c2DdBFD',
      abi: TokenABI,
    },
    TheXdaoNFT: {
      address: "0xa0abD49783366b5ce5AD82E05E7167313f427b63",
      abi: TheXdaoNFTABI,
    },
    TheXdaoMarket: {
      address: "0x31c5cc4936b875b5211afa256b7fc0572b038726",
      abi: TheXdaoMarketABI
    },
    TheXdaoAuction: {
      address: "0x42422b0c9a007fdf3104b39dfe13cd6fc429a208",
      abi: TheXdaoAuctionABI
    }
  },  
}

export function getContractInfo(name, chainId = null) {
  if(!chainId) chainId = currentNetwork;

  const contracts = CONTRACTS_BY_NETWORK?.[chainId];  
  if(contracts) {
    return contracts?.[name];
  }else{
    return null;
  }
}

export function getContractObj(name, chainId, provider) {
  const info = getContractInfo(name, chainId);
  return !!info && new Contract(info.address, info.abi, provider);
}

export function getCollectionContract(address, chainId, provider) {
  const info = getContractInfo('TheXdaoNFT', chainId);
  return !!info && new Contract(address, info.abi, provider);
}

export const shorter = (str) =>
  str?.length > 8 ? str.slice(0, 6) + '...' + str.slice(-4) : str

export function formatNum(value) {
  let intValue = Math.floor(value)
  if (intValue < 10) {
    return ''+ parseFloat(value).toFixed(2)
  } else if (intValue < 1000){
    return '' + intValue
  } else if (intValue < 1000000) {
    return parseFloat(intValue/1000).toFixed(1) + 'K'
  } else if (intValue < 1000000000) {
    return parseFloat(intValue/1000000).toFixed(1) + 'M'
  } else {
    return parseFloat(intValue/1000000000).toFixed(1) + 'G'
  }
}

