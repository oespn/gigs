
import { useState, useEffect } from 'react'
import { styled } from '@stitches/react'
import WalletBalance from './WalletBalance';
import { BsPalette, BsPiggyBank } from 'react-icons/bs';
import { BsChevronDown } from 'react-icons/bs'
import Image from 'next/image'
import { useAppContext } from '../../context/state'
import { initXRPL, signout } from '../../context/utils'
import { useRouter } from 'next/router';

const Main = styled("div", {
  width: '8em',
  position: 'sticky',
  right: 0,
});

const DropDownContainer = styled("div", {
  width: '10em',
  margin: '0 auto 5',
  right:0,
});

const DropDownHeader = styled("div", {
  'margin-top': 2,
  'margin-bottom': '0.0em',
  background: '#ffffff',
});

const DropDownListContainer = styled("div",
{
  position: 'fixed',

});

const DropDownList = styled("ul", {
  width: '9em',
  padding: 0,
  margin: 0,
  'padding-left': '1em',
  background: '#ffffff',
  border: '2px solid #e5e5e5',
  'box-sizing': 'border-box',
  '&:first-child' : '{ padding-top: 0.2em;}',
});

const ListOption = styled("li", {
  textAlign: 'right',
  justifyContent: 'right',
  color: 'Grey',
  fontSize: '0.8em',
  'margin-bottom': '0.2em',
});

const ListItem = styled("li", {
  'list-style': 'none',
  textAlign: 'left',
  color: '#6366F1',
  fontSize: '0.8em',
  'margin-bottom': '0.2em',
});

const options = ["A", "C"];

const DropDownMenu = ({props}) =>
{
    const sessionState = useAppContext();
    const router = useRouter();

    const [walletBalance, setBalance] = useState("0");

    useEffect(() => {
      /* initalise XRPL api here and store in AppContext */ 
      const init = async () => {
        const { xrpl, wallet } = await initXRPL();
        sessionState.xrpl = xrpl;
        sessionState.wallet = wallet;

        if (sessionState.wallet && sessionState.wallet.isSignedIn()) {
            console.log(sessionState.wallet.getAccountId());
            const account = await xrpl.account(sessionState.wallet.getAccountId());
            const b = await account.getAccountBalance();
            console.log(b.available);
            setBalance(b.available.toString());
        }
      }

      init();
    }, []);

    const [isOpen, setIsOpen] = useState(false);
    const [selectedOption, setSelectedOption] = useState("A");
    
    console.log('handleStatusChange:'+props.handleStatusChange);
    const setIsClient = props.handleStatusChange;

    var isClient = props.isClient;

    const toggling = () => setIsOpen(!isOpen);
  
    const onOptionClicked = value => () => {
      setSelectedOption(value);
      isClient = (value=="C");
      setIsOpen(false);
      console.log('sel option:'+selectedOption);
      console.log('isClient:'+props.isClient);
      props.handleStatusChange(isClient);
      /* reload UI with correct dashboard */
    };

    var shortName = sessionState.wallet && sessionState.wallet.getAccountId();
    if (shortName) { 
      shortName = shortName.toString().replace('.testnet', '');
      shortName = shortName.toString().replace('.xrpl', '');
    }

    return (
    <Main>
      <DropDownContainer>
          <DropDownHeader onClick={toggling}>
            <button className="flex items-center gap-1 ">
              <span className="text-sm font-medium">{(shortName)}</span>
              {/* <span className="mx-1">
                <Image
                  src="/images/julian.jpg"
                  width={32}
                  height={32}
                  className="rounded-full"
                  alt="User image"
                />
              </span> */}
              <span>
                {selectedOption == "A" ? <BsPalette/> : <BsPiggyBank/> }
              </span>
              <span>
                <BsChevronDown className="text-sm" />
              </span>
            </button>
          </DropDownHeader>
        {isOpen && (
          <DropDownListContainer>
            <DropDownList>
              <WalletBalance balance={walletBalance}/>
              <hr/>
              <ListItem onClick={onOptionClicked('')} >Switch mode</ListItem>
              {options.map(option => (
                <ListOption onClick={onOptionClicked(option)} key={Math.random()}>
                  <span className='flex'>
                  &nbsp;&nbsp;
                    {option == "A" ? 'Artist' : 'Client' }&nbsp;
                    {option == "A" ? <BsPalette/> : <BsPiggyBank/> }
                   
                  </span>
                </ListOption>
              ))}
              <ListItem onClick={() => { signout(sessionState.wallet); router.push("/");}} >Sign Out</ListItem>
            </DropDownList>
          </DropDownListContainer>
        )}
     </DropDownContainer>
    </Main>
  )
}

export default DropDownMenu; 