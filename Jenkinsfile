/* 需要 Docker Pipeline 插件 */
node('docker') {
    checkout scm
    stage('Build') {
        docker.image('node:6.3').inside {
            sh 'npm --version'
        }
    }
}
