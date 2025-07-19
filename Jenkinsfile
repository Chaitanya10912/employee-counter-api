pipeline {
  agent any

  environment {
    IMAGE_NAME = "employee-counter"
     DOCKER_CREDENTIALS_ID = 'dockerhub-creds'
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
          docker.build("%{IMAGE_NAME}%")
        }
      }
    }
    
   stage('Login to Docker Hub') {
      steps {
        withCredentials([usernamePassword(credentialsId: 'dockerhub-creds', usernameVariable: 'DOCKER_USER', passwordVariable: 'DOCKER_PASS')]) {
          script {
            env.IMAGE_NAME = "employee-counter"
            bat 'echo %DOCKER_PASS% | docker login -u %DOCKER_USER% --password-stdin'
        }
      }
    }
   }

    stage('Push Docker Image') {
      steps {
        bat "docker push %{IMAGE_NAME}%"
      }
    }

    stage('Clean up') {
      steps {
        bat "docker rmi %{IMAGE_NAME}% || true"
      }
    }
  }
} 
