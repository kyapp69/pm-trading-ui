import { getROGnosisConnection } from 'api'

export const getTokenSymbol = async (tokenAddress) => {
  const gnosis = await getROGnosisConnection()
  const token = await gnosis.contracts.DetailedERC20.at(tokenAddress)
  const tokenSymbol = await token.symbol()
  return tokenSymbol
}

export const getTokenBalance = async (tokenAddress, accountAddress) => {
  const gnosis = await getROGnosisConnection()
  const token = await gnosis.contracts.Token.at(tokenAddress)
  const balance = await token.balanceOf(accountAddress)
  return balance.toString()
}
