pipeline {
    agent any

    environment {
        NODEJS_HOME = tool name: 'NodeJS', type: 'NodeJSInstallation'
        PATH = "${NODEJS_HOME}/bin:${env.PATH}"
    }

    stages {
        stage('Checkout') {
            steps {
                git branch: 'main', url: 'https://github.com/sireeshasn/Github-Pipeline.git'
            }
        }
        stage('Build') {
            steps {
                echo 'Building the application...'
                sh 'npm install'
                // Create a build artifact
                sh 'tar -czf build-artifact.tar.gz *'
                archiveArtifacts artifacts: 'build-artifact.tar.gz', allowEmptyArchive: false
            }
        }
        stage('Test') {
            steps {
                echo 'Running tests...'
                sh 'npm test'
            }
        }
        stage('Code Quality Analysis') {
            steps {
                echo 'Running code quality analysis...'
                withSonarQubeEnv('SonarQube') {
                    sh 'sonar-scanner -Dsonar.projectKey=Github-Pipeline -Dsonar.sources=. -Dsonar.host.url=http://your-sonarqube-server -Dsonar.login=your-sonarqube-token'
                }
            }
        }
        stage('Deploy to Test Environment') {
            steps {
                echo 'Deploying to Test Environment...'
                // Example: Deploy to a Docker container
                sh 'docker-compose up -d'
            }
        }
        stage('Release to Production') {
            steps {
                echo 'Releasing to Production...'
                // Example: Deploy to a production server
                sh 'scp build-artifact.tar.gz user@prod-server:/path/to/deploy'
                sh 'ssh user@prod-server "tar -xzf /path/to/deploy/build-artifact.tar.gz -C /path/to/deploy"'
            }
        }
        stage('Monitoring and Alerting') {
            steps {
                echo 'Setting up Monitoring and Alerting...'
                // Example: Send a monitoring request to Datadog
                sh 'curl -X POST -H "Content-type: application/json" -d \'{"service":"Github-Pipeline","description":"Monitor description"}\' "https://api.datadoghq.com/api/v1/service_checks?api_key=YOUR_API_KEY"'
            }
        }
    }

    post {
        always {
            echo 'Cleaning up...'
            cleanWs()
        }
        success {
            echo 'Pipeline succeeded!'
        }
        failure {
            echo 'Pipeline failed!'
            // Add alerting mechanism here, e.g., email or Slack notification
        }
    }
}
