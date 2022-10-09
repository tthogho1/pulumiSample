import * as pulumi from "@pulumi/pulumi";
import * as aws from "@pulumi/aws";
import * as awsx from "@pulumi/awsx";

// Create an AWS resource (S3 Bucket)
const bucket = new aws.s3.Bucket("my-bucket", {
    website: {
        indexDocument: "index.html",
    },
});
const bucketObject = new aws.s3.BucketObject("facades.tar.gz", {
    acl: "public-read",
    contentType: "application/octet-stream",
    bucket: bucket,
    source: new pulumi.asset.FileAsset("facades.tar.gz")
});

// Export the name of the bucket
export const bucketEndpoint = pulumi.interpolate`http://${bucket.websiteEndpoint}`;