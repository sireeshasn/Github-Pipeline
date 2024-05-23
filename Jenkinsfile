pipeline {
    agent any

    environment {
        NODEJS_HOME = tool name: 'NodeJS 14', type: 'NodeJSInstallation'
        PATH = "${NODEJS_HOME}/bin:${env.PATH}"
    }

    stages {
        stage('Checkout') {
            steps {
                git 'https://github.com/sireeshasn/sit725-2024-t1-prac6-main.git'
            }
        }
        stage('Build') {
            steps {
                echo 'Building...'
                sh 'npm install'
            }
        }
        stage('Test') {
            steps {
                echo 'Testing...'
                sh 'npm test'
            }
        }
        stage('Code Quality Analysis') {
            steps {
                echo 'Analyzing Code Quality...'
                withSonarQubeEnv('SonarQube') {
                    sh 'sonar-scanner -Dsonar.projectKey=sit725-2024-t1-prac6-main -Dsonar.sources=. -Dsonar.host.url=http://your-sonarqube-server -Dsonar.login=your-sonarqube-token'
                }
            }
        }
        stage('Deploy to Test Environment') {
            steps {
                echo 'Deploying to Test Environment...'
                sh 'scp -r ./* user@test-server:/path/to/deploy'
            }
        }
        stage('Release to Production') {
            steps {
                echo 'Releasing to Production...'
                sh 'scp -r ./* user@prod-server:/path/to/deploy'
            }
        }
        stage('Monitoring and Alerting') {
            steps {
                echo 'Setting up Monitoring and Alerting...'
                sh 'curl -X POST -H "Content-type: application/json" -d \'{"service":"sit725-2024-t1-prac6-main","description":"Monitor description"}\' "https://api.datadoghq.com/api/v1/service_checks?api_key=YOUR_API_KEY"'
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
