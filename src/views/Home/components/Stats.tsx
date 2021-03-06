import React, { useMemo } from 'react'
import styled from 'styled-components'
import { BigNumber } from 'ethers';
import numeral from 'numeral'

import Card from '../../../components/Card'
import CardContent from '../../../components/CardContent'
import Label from '../../../components/Label'

import { getDisplayBalance } from '../../../utils/formatBalance'

interface StatsProps {
  circSupply?: string,
  curPrice?: number,
  targetPrice?: number,
  totalSupply?: string
}
const Stats: React.FC<StatsProps> = ({
  circSupply,
  curPrice,
  targetPrice,
  totalSupply,
}) => {

  const formattedTotalSupply = useMemo(() => {
    if (totalSupply) {
      const supplyStr = getDisplayBalance(BigNumber.from(totalSupply))
      return numeral(supplyStr).format('0.0a')
    } else return '--'
  }, [totalSupply])

  return (
    <StyledStats>
      <Card>
        <CardContent>
          <StyledStat>
            <StyledValue>{curPrice ? `$${getDisplayBalance(BigNumber.from(curPrice))}` : '--'}</StyledValue>
            <Label text="Current price" />
          </StyledStat>
        </CardContent>
      </Card>

      <StyledSpacer />

      <Card>
        <CardContent>
          <StyledStat>
            <StyledValue>{targetPrice ? `$${targetPrice}` : '--'}</StyledValue>
            <Label text="target price" />
          </StyledStat>
        </CardContent>
      </Card>

      <StyledSpacer />

      <Card>
        <CardContent>
          <StyledStat>
            <StyledValue>
              ${formattedTotalSupply}
            </StyledValue>
            <Label text="Total supply" />
          </StyledStat>
        </CardContent>
      </Card>
    </StyledStats>
  )
}

const StyledStats = styled.div`
  width: 325px;
`

const StyledStat = styled.div`
  display: flex;
  flex-direction: column;
`

const StyledValue = styled.span`
  color: ${props => props.theme.color.grey[600]};
  font-size: 36px;
  font-weight: 700;
`

const StyledSpacer = styled.div`
  height: ${props => props.theme.spacing[4]}px;
`

export default Stats