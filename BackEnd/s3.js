import * as dotenv from 'dotenv'
dotenv.config()
import {S3Client, PutObjectCommand} from "@aws-sdk/client-s3"
import crypto from 'crypto'
const Bucket_Name = 'cactus-store'

const bucketName = process.env.cactus-store
const bucketRegion = process.env.REACT_APP_AWS_BUCKET_REGION
const bucketKey = process.env.REACT_APP_AWS_ACCESS_KEY
const bucketSecretKey = process.env.REACT_APP_AWS_SECRET_KEY

const randomImageName = (bytes = 32) => crypto.randomBytes(bytes).toString('hex')

const s3 = new S3Client({
	credentials:{
		accessKeyId:bucketKey,
		secretAccessKey:bucketSecretKey,
	},
	region:bucketRegion
})


const uploadFile = async (body, type) => {
	const imageName= randomImageName()
	const params = {
		Bucket:bucketName,
		Key:imageName,
		Body:body,
		ContentType:type
	}

	const command = new PutObjectCommand(params)
	await s3.send(command)
	return `https://cactus-store.s3.us-west-2.amazonaws.com/${imageName}`
}

const downloadFile = (filekey) => {
	const dowloadParams = {
		Key:filekey,
		Bucket:Bucket_Name
	}
	return s3.getObject(dowloadParams).createReadStream()
}

export {uploadFile, downloadFile}