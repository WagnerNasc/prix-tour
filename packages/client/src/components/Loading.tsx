import styled from 'styled-components'

const SkeletonDiv = styled.div<{ size: string }>`
  width: ${props => props.size};
  height: ${props => props.size};
  background-color: #eee;
  border-radius: 4px;
  animation: pulse 1s infinite ease-in-out;

  @keyframes pulse {
    0% {
      background-color: #f2ecec;
    }
    50% {
      background-color: #eff5ef;
    }
    100% {
      background-color: #eff2eb;
    }
  }
`

type SkeletonProps = {
  size: string
}

const Skeleton = ({ size }: SkeletonProps) => {
  return <SkeletonDiv size={size} />
}

export default Skeleton
