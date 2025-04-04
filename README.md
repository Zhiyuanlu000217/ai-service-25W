# ai-service-25W

## Set up action variables and secrets
In order to make ci-cd run properly in your system, please goto GitHub > Settings > Secrets and Variables  > Actions tab to fill in the corresponding credentials:

Secrets (in GitHub repository settings):

`DOCKERHUB_USERNAME` - Docker Hub username
`DOCKERHUB_TOKEN` - Avaliable at DockerHub > Account Settings
`KUBE_CONFIG_DATA` - Base64 encoded Kubernetes config file. You can run `kubectl config view --raw | base64` to retrieve the `KUBE_CONFIG_DATA`


Variables (in GitHub repository settings):
`DOCKER_IMAGE_NAME` - Name of your Docker image, for this one, `product-service`
`DEPLOYMENT_NAME` - Name of your Kubernetes deployment, for this one `product-service`
`CONTAINER_NAME` - Name of the container in your Kubernetes deployment, for this one `product-service`

## Set up kubectl secret

Please fill out the empty value under `k8s/secret.yml` with your own.

## Apply

Once connected to AKS cluster, you can simply go to the root directry and run `kubectl apply -f k8s/`, it will automatically create the deployment, secret and service for you.

> **Note**
> Since the service is exposed with ClusterIP, it will not accessible with public ip
