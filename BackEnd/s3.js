import * as dotenv from 'dotenv'
dotenv.config()
import {S3Client, PutObjectCommand} from "@aws-sdk/client-s3"
import crypto from 'crypto'
const Bucket_Name = 'cactus-store'

const bucketName = 'cactus-store'
const bucketRegion = 'us-west-2'
const bucketKey = 'AKIASYRELSODI7ML7DJP'
const bucketSecretKey = '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'

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