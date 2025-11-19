// Map skill names to devicon classes
export const skillIconMap: Record<string, string> = {
  // Languages
  'Java': 'devicon-java-plain colored',
  'PHP': 'devicon-php-plain colored',
  'Python': 'devicon-python-plain colored',
  'C#': 'devicon-csharp-plain colored',
  
  // Frameworks
  'Spring Boot': 'devicon-spring-plain colored',
  'Laravel': 'devicon-laravel-plain colored',
  'Symfony': 'devicon-symfony-plain colored',
  '.NET Core': 'devicon-dotnetcore-plain colored',

  // Cloud & Infrastructure
  'Lambda': 'devicon-amazonwebservices-plain colored',
  'API Gateway': 'devicon-amazonwebservices-plain colored',
  'EC2 (Elastic Compute Cloud)': 'devicon-amazonwebservices-plain colored',
  'ECS (Elastic Container Service)': 'devicon-amazonwebservices-plain colored',
  'S3 (Simple Storage Service)': 'devicon-amazonwebservices-plain colored',
  'SQS (Simple Queue Service)': 'devicon-amazonwebservices-plain colored',
  'DynamoDB': 'devicon-amazonwebservices-plain colored',
  'CloudFormation': 'devicon-amazonwebservices-plain colored',
  'Serverless Computing': 'devicon-amazonwebservices-plain colored',
  
  // DevOps & Containerization
  'Docker': 'devicon-docker-plain colored',
  'Kubernetes': 'devicon-kubernetes-plain colored',
  'Git': 'devicon-git-plain colored',
  'GitHub Actions': 'devicon-github-plain colored',
  'Jenkins': 'devicon-jenkins-plain colored',
  
  // Databases
  'PostgreSQL': 'devicon-postgresql-plain colored',
  'MySQL': 'devicon-mysql-plain colored',
  'MongoDB': 'devicon-mongodb-plain colored',
  'Redis': 'devicon-redis-plain colored',
  
  // Testing & Quality Assurance
  'JUnit': 'devicon-java-plain colored',
  'Mockito': 'devicon-java-plain colored',
  
  // Best Practices
  'Clean Code': 'devicon-gitbook-plain colored',
  'SOLID Principles': 'devicon-gitbook-plain colored',
  'Design Patterns': 'devicon-gitbook-plain colored',
  
  // Performance & Monitoring
  'Grafana K6': 'devicon-k6-plain colored',
  'Prometheus': 'devicon-prometheus-plain colored',
  'Grafana': 'devicon-grafana-plain colored',
  
  // Project & Collaboration Tools
  'Jira': 'devicon-jira-plain colored',
  'Trello': 'devicon-trello-plain colored',
  
  // Development Tools
  'Postman': 'devicon-postman-plain colored'
};

// Default icon for skills without specific mapping
export const DefaultSkillIcon = 'devicon-devicon-plain colored';

export function getSkillIcon(skillName: string): string {
  return skillIconMap[skillName] || DefaultSkillIcon;
}
