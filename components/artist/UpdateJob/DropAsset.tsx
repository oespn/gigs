import { useState, useEffect } from 'react'
import { useDropzone } from 'react-dropzone'
import { NFTStorage } from 'nft.storage'

const client = new NFTStorage({ token: process.env.NFT_STORAGE_KEY })
const thumbsContainer = {
  display: 'flex',
  flexDirection: 'row',
  flexWrap: 'wrap',
  marginTop: 16
};

const thumb = {
  display: 'inline-flex',
  borderRadius: 2,
  border: '1px solid #eaeaea',
  marginBottom: 8,
  marginRight: 8,
  width: 100,
  height: 100,
  padding: 4,
  boxSizing: 'border-box'
};

const thumbInner = {
  display: 'flex',
  minWidth: 0,
  overflow: 'hidden'
};

const img = {
  display: 'block',
  width: 'auto',
  height: '100%'
};

//DONE: Implement preview of image once uploaded
//TODO: Complete API approach to IPFS upload

const DropAsset = () => {

    const [files, setFiles] = useState([]);
    const [status, setStatus] = useState('');
    const [isUpload, setIsUpload] = useState(false);

    const uploadNFTStorage = async(files: File[]) => {
      setStatus('Uploading to nft.storage...')
      setIsUpload(true)
      const metadata = await client.store({
        name: files[0].name,
        description: files[0].name,
        image: files[0],
      })
      setStatus(`Upload complete! Minting token with metadata URI: ${metadata.url}`);
      setIsUpload(false)
      console.log(metadata.url)
    }

    const {getRootProps, getInputProps} = useDropzone({
      accept: 'image/*',
      onDrop: acceptedFiles => {
        setFiles(acceptedFiles.map(file => 
            Object.assign(file, {
              preview: URL.createObjectURL(file)
            })
        ));
        console.log(acceptedFiles);
        uploadNFTStorage([...acceptedFiles])
        //const nftStored = async() => { uploadToStorage(acceptedFiles[0]); }
      }
    })
    
    const fileList = files.map(file => (
      <li key={file.path}>
        {file.path} - {file.size} bytes
      </li>
    ));
  
    const thumbs = files.map(file => 
      (
      <div key={file.name}>
        <div style={thumbInner}>
          <img
            src={file.preview}
            style={img}
          />
        </div>
      </div>
      )
    );
  
    useEffect(() => {
      // Make sure to revoke the data uris to avoid memory leaks
      return () => {
        files.forEach(file => URL.revokeObjectURL(file.preview));
      }
    }, [files]);
  
    return (
      <section className="container">
        <div> 
          <p className="break-words">{status}</p>
          <span>
          </span>
        </div>
        {!isUpload && 
          <div>
            <div {...getRootProps({className: 'dropzone', onClick: evt => evt.preventDefault()})}>
              <input {...getInputProps()} />
              {
                files.length === 0 && <p>Drag &amp; drop some files here, or click to select files</p>         
              }
            </div>
            <div >
              {thumbs}
            </div>
            <ul className="text-sm">{fileList}</ul>
          </div>
        }
      </section>
    )
  
     async function uploadToStorage(file) {
  
  /* nft.storage incompatible with webpack 4.  Use API Approach instead 
  
  
        // First we use the nft.storage client library to add the image and metadata to IPFS / Filecoin
      //const client = new NFTStorage({ token: NFT_STORAGE_KEY });
      //const client = ipfsHttpClient('https://ipfs.infura.io:5001/api/v0')
  
      //setStatus("Uploading to nft.storage...")
      const metadata = await client.store({
        name: file,
        description: `${file} description!`,
        image: { type: 'image/jpg' },
      });
      //setStatus(`Upload complete! Minting token with metadata URI: ${metadata.url}`);
  
      // the returned metadata.url has the IPFS URI we want to add.
      // our smart contract already prefixes URIs with "ipfs://", so we remove it before calling the `mintToken` function
      const metadataURI = metadata.url.replace(/^ipfs:\/\//, "");
  
  
  */
  
  
      // const metadata = client.store({
      //   name: `${file}`,
      //   description: `${file} description!`,
      //   image: new File(
      //     [
      //       /* data */
      //     ],
      //     file,
      //     { type: 'image/jpg' }
      //   ),
      // })
      // console.log(metadata.url);
      //console.log(metadataURI);
    }
    
  }



  export default DropAsset;