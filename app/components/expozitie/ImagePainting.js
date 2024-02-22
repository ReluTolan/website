import Image from "next/image"
import "@/app/(pages)/page-styles.css"

const ImagePainting = ({
  src,
  alt,
  title,
  category,
  description,
  size,
  price,
}) => {
  return (
    <div className="Ip-container">
      <p>{title}</p>

      <div className="Ip-frame">
        <div className="Ip-image">
          <Image
            src={src}
            alt={alt}
            layout="responsive"
            width={500}
            height={500}
          />
        </div>
      </div>
    </div>
  )
}

export default ImagePainting
