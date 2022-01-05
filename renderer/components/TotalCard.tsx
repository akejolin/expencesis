import React from 'react'
import FlexView from '../components/flexView'
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

type Props = {
  primaryText?: string,
  secondaryText?: string,
  subberText?: string,
  faIcon?: any,
  iconColor?: string,
}


const TotalCard = ( props: Props) => {

  const iconColor = props.iconColor ? props.iconColor : '#ffffff'

  const StyledFlex = styled(FlexView)(({ theme }) => ({
    background: 'radial-gradient(circle, rgba(16,32,52,1) 0%, rgba(14,29,46,1) 100%)',
    borderRadius: 3,
    height: 80,
  }))
  
  const PrimaryText = styled(Typography)(({ theme }) => ({
    color: '#a1a1a1',
  }))
  const SecondaryText = styled(Typography)(({ theme }) => ({
    color: '#ffffff',
    fontSmooth: 'always',
    fontWeight: 'bold',
    fontSize: 19
  }))
  const SubberText = styled(Typography)(({ theme }) => ({
    fontSmooth: 'always',
    fontSize: 11,
    color: '#a1a1a1',
  }))
  
  const IconWindow = styled(FlexView)(({ theme }) => ({
     margin: 20,
     background:'radial-gradient(circle, rgba(18,37,60,1) 0%, rgba(6,14,23,1) 100%)',
     borderRadius: 3,
     color: iconColor.match(/#/g) ? iconColor : theme.palette[iconColor ? iconColor : 'warning'].main,
     fontSize: 19,
  }))


  return (
  <StyledFlex>
    <FlexView row>
        <IconWindow style={{width: 70, height:'50px',}}>
          <FontAwesomeIcon icon={props.faIcon} />
        </IconWindow>  
        <FlexView row={false} style={{alignItems:'flex-start', textAlign: 'left'}}>
          <PrimaryText variant="body2">{props.primaryText}</PrimaryText>
          <SecondaryText variant="body">{props.secondaryText}</SecondaryText>
          <SubberText>{props.subberText}</SubberText>
        </FlexView>


    </FlexView>
    
  </StyledFlex>
)}

export default TotalCard