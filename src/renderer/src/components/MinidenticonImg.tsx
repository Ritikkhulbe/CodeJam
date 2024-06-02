import { minidenticon } from 'minidenticons'
import { useMemo } from 'react'

type Props = {
  seed: string
  saturation?: string | number | undefined
  lightness?: string | number | undefined
  hashFn?: ((str: string) => number) | undefined
} & React.DetailedHTMLProps<React.ImgHTMLAttributes<HTMLImageElement>, HTMLImageElement>

// eslint-disable-next-line react/prop-types
const MinidenticonImg: React.FC<Props> = ({ seed, saturation, lightness, ...props }) => {
  const svgURI = useMemo(
    () =>
      'data:image/svg+xml;utf8,' + encodeURIComponent(minidenticon(seed, saturation, lightness)),
    [seed, saturation, lightness]
  )
  return <img src={svgURI} alt={seed} {...props} />
}

export { MinidenticonImg }
