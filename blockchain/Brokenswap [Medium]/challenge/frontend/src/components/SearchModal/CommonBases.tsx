import { ChainId, Token } from '@ubeswap/sdk'
import { useAllTokens } from 'hooks/Tokens'
import React from 'react'
import { Text } from 'rebass'
import styled from 'styled-components'

import { AutoColumn } from '../Column'
import CurrencyLogo from '../CurrencyLogo'
import QuestionHelper from '../QuestionHelper'
import { AutoRow } from '../Row'

const BaseWrapper = styled.div<{ disable?: boolean }>`
  border: 1px solid ${({ theme, disable }) => (disable ? 'transparent' : theme.bg3)};
  border-radius: 10px;
  display: flex;
  padding: 6px;

  align-items: center;
  :hover {
    cursor: ${({ disable }) => !disable && 'pointer'};
    background-color: ${({ theme, disable }) => !disable && theme.bg2};
  }

  background-color: ${({ theme, disable }) => disable && theme.bg3};
  opacity: ${({ disable }) => disable && '0.4'};
`

export default function CommonBases({
  onSelect,
  selectedCurrency,
}: {
  chainId?: ChainId
  selectedCurrency?: Token | null
  onSelect: (currency: Token) => void
}) {
  const allTokens = useAllTokens()
  return (
    <AutoColumn gap="md">
      <AutoRow>
        <Text fontWeight={500} fontSize={14}>
          {'Common bases'}
        </Text>
        <QuestionHelper text={'These tokens are commonly paired with other tokens.'} />
      </AutoRow>
      <AutoRow gap="4px">
        {[].map((token: Token) => {
          const selected = selectedCurrency instanceof Token && selectedCurrency.address === token.address
          return (
            <BaseWrapper onClick={() => !selected && onSelect(token)} disable={selected} key={token.address}>
              <CurrencyLogo currency={allTokens[token.address] ?? token} style={{ marginRight: 8 }} />
              <Text fontWeight={500} fontSize={16}>
                {token.symbol}
              </Text>
            </BaseWrapper>
          )
        })}
      </AutoRow>
    </AutoColumn>
  )
}
