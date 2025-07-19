pipeline {
  agent any

  environment {
    REGISTRY = "docker.io"
    IMAGE_NAME = "${DOCKER_USER}/employee-counter"
    TAG = "build-${BUILD_NUMBER}"
  }

  stages {
    stage('Clone Repository') {
      steps {
        git url: 'https://github.com/Chaitanya10912/employee-counter-api.git', branch: 'main'
      }
    }

    stage('Build Docker Image') {
      steps {
        script {
          docker.build("${IMAGE_NAME}:${TAG}")
        }
      }
    }
    
   stage('Login to Docker Hub') {
      steps {
        withCredentials([usernamePassword(credentialsId: 'dockerhub-creds', usernameVariable: 'DOCKER_USER', passwordVariable: 'DOCKER_PASS')]) {
          script {
            env.IMAGE_NAME = "${DOCKER_USER}/employee-counter"
            sh 'echo $DOCKER_PASS | docker login -u $DOCKER_USER --password-stdin'
        }
      }
    }

    stage('Push Docker Image') {
      steps {
        sh "docker push ${IMAGE_NAME}:${TAG}"
      }
    }

    stage('Clean up') {
      steps {
        sh "docker rmi ${IMAGE_NAME}:${TAG} || true"
      }
    }
  }
}
