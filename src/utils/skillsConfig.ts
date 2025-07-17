// Shared skills configuration for both home and about pages

export interface SkillItem {
  name: string;
  description?: string;
  href?: string;
}

export interface SkillCategory {
  title: string;
  skills: SkillItem[];
}

// Simple skill arrays for home page (pill display)
export const skillArrays = {
  languagesFrameworks: ['Java (Spring Boot)', 'PHP (Laravel, Symfony)', 'Python'],
  cloudInfrastructure: ['Lambda', 'API Gateway', 'EC2 (Elastic Compute Cloud)', 'ECS (Elastic Container Service)', 'S3 (Simple Storage Service)', 'SQS (Simple Queue Service)', 'DynamoDB', 'CloudFormation', 'Serverless Computing'],
  devopsContainerization: ['Docker', 'Kubernetes', 'Git', 'GitHub Actions', 'Jenkins'],
  databases: ['PostgreSQL', 'MySQL', 'MongoDB', 'Redis'],
  testingQualityAssurance: ['JUnit', 'Mockito'],
  bestPractices: ['Clean Code', 'SOLID Principles', 'Design Patterns'],
  performanceMonitoring: ['Grafana K6', 'Prometheus', 'Grafana'],
  projectCollaboration: ['Jira', 'Trello']
};

// Detailed skill data for about page (with descriptions and links)
export const skillCategories: SkillCategory[] = [
  {
    title: 'Languages & Frameworks',
    skills: [
      {
        name: 'Java (Spring Boot)',
        description: 'Backend Development Framework',
        href: 'https://spring.io/projects/spring-boot'
      },
      {
        name: 'PHP (Laravel, Symfony)',
        description: 'Web Development Languages & Frameworks',
        href: 'https://www.php.net/'
      },
      {
        name: 'Python',
        description: 'Programming Language',
        href: 'https://www.python.org/'
      }
    ]
  },
  {
    title: 'Cloud & Infrastructure',
    skills: [
      {
        name: 'Lambda',
        description: 'Serverless Computing',
        href: 'https://aws.amazon.com/lambda/'
      },
      {
        name: 'API Gateway',
        description: 'API Management',
        href: 'https://aws.amazon.com/api-gateway/'
      },
      {
        name: 'EC2 (Elastic Compute Cloud)',
        description: 'Virtual Servers',
        href: 'https://aws.amazon.com/ec2/'
      },
      {
        name: 'ECS (Elastic Container Service)',
        description: 'Container Orchestration',
        href: 'https://aws.amazon.com/ecs/'
      },
      {
        name: 'S3 (Simple Storage Service)',
        description: 'Object Storage',
        href: 'https://aws.amazon.com/s3/'
      },
      {
        name: 'SQS (Simple Queue Service)',
        description: 'Message Queuing',
        href: 'https://aws.amazon.com/sqs/'
      },
      {
        name: 'DynamoDB',
        description: 'NoSQL Database',
        href: 'https://aws.amazon.com/dynamodb/'
      },
      {
        name: 'CloudFormation',
        description: 'Infrastructure as Code',
        href: 'https://aws.amazon.com/cloudformation/'
      },
      {
        name: 'Serverless Computing',
        description: 'Event-driven Architecture',
        href: 'https://aws.amazon.com/serverless/'
      }
    ]
  },
  {
    title: 'DevOps & Containerization',
    skills: [
      {
        name: 'Docker',
        description: 'Containerization Platform',
        href: 'https://www.docker.com/'
      },
      {
        name: 'Kubernetes',
        description: 'Container Orchestration',
        href: 'https://kubernetes.io/'
      },
      {
        name: 'Git',
        description: 'Version Control System',
        href: 'https://git-scm.com/'
      },
      {
        name: 'GitHub Actions',
        description: 'CI/CD Platform',
        href: 'https://github.com/features/actions'
      },
      {
        name: 'Jenkins',
        description: 'Automation Server',
        href: 'https://www.jenkins.io/'
      }
    ]
  },
  {
    title: 'Databases',
    skills: [
      {
        name: 'PostgreSQL',
        description: 'Relational Database',
        href: 'https://www.postgresql.org/'
      },
      {
        name: 'MySQL',
        description: 'Relational Database',
        href: 'https://www.mysql.com/'
      },
      {
        name: 'MongoDB',
        description: 'NoSQL Database',
        href: 'https://www.mongodb.com/'
      },
      {
        name: 'Redis',
        description: 'In-memory Data Store',
        href: 'https://redis.io/'
      }
    ]
  },
  {
    title: 'Testing & Quality Assurance',
    skills: [
      {
        name: 'JUnit',
        description: 'Java Testing Framework',
        href: 'https://junit.org/'
      },
      {
        name: 'Mockito',
        description: 'Mocking Framework',
        href: 'https://site.mockito.org/'
      }
    ]
  },
  {
    title: 'Best Practices',
    skills: [
      {
        name: 'Clean Code',
        description: 'Code Quality Principles',
        href: 'https://www.oreilly.com/library/view/clean-code-a/9780136083238/'
      },
      {
        name: 'SOLID Principles',
        description: 'Object-Oriented Design',
        href: 'https://en.wikipedia.org/wiki/SOLID'
      },
      {
        name: 'Design Patterns',
        description: 'Software Design Solutions',
        href: 'https://refactoring.guru/design-patterns'
      }
    ]
  },
  {
    title: 'Performance & Monitoring',
    skills: [
      {
        name: 'Grafana K6',
        description: 'Load Testing Tool',
        href: 'https://k6.io/'
      },
      {
        name: 'Prometheus',
        description: 'Monitoring System',
        href: 'https://prometheus.io/'
      },
      {
        name: 'Grafana',
        description: 'Analytics & Monitoring',
        href: 'https://grafana.com/'
      }
    ]
  },
  {
    title: 'Project & Collaboration Tools',
    skills: [
      {
        name: 'Jira',
        description: 'Project Management',
        href: 'https://www.atlassian.com/software/jira'
      },
      {
        name: 'Trello',
        description: 'Task Management',
        href: 'https://trello.com/'
      }
    ]
  }
];

// Helper function to convert detailed skills to simple arrays for home page
export function getSkillArraysFromCategories(): typeof skillArrays {
  return skillCategories.reduce((acc, category) => {
    const key = category.title
      .toLowerCase()
      .replace(/\s+/g, '')
      .replace(/&/g, '')
      .replace(/[^a-z]/g, '');
    
    // Map category titles to their corresponding keys
    const keyMapping: Record<string, keyof typeof skillArrays> = {
      'languagesframeworks': 'languagesFrameworks',
      'cloudinfrastructure': 'cloudInfrastructure',
      'devopscontainerization': 'devopsContainerization',
      'databases': 'databases',
      'testingqualityassurance': 'testingQualityAssurance',
      'bestpractices': 'bestPractices',
      'performancemonitoring': 'performanceMonitoring',
      'projectcollaborationtools': 'projectCollaboration'
    };
    
    const mappedKey = keyMapping[key];
    if (mappedKey) {
      acc[mappedKey] = category.skills.map(skill => skill.name);
    }
    
    return acc;
  }, {} as typeof skillArrays);
}

// Helper function to convert skill category to tools format for SkillToolSection
export function skillCategoryToTools(category: SkillCategory) {
  return category.skills.map(skill => ({
    name: skill.name,
    description: skill.description || '',
    href: skill.href || '#',
    icon: getSkillIcon(skill.name)
  }));
}

// Import the skill icon mapping function
import { getSkillIcon } from './skillIcons';
