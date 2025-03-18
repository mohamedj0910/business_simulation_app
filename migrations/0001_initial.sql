-- Migration number: 0001        2025-03-18T11:34:00.000Z
-- Business Simulation Web App Database Schema

-- Drop existing tables if they exist
DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS simulations;
DROP TABLE IF EXISTS simulation_users;
DROP TABLE IF EXISTS companies;
DROP TABLE IF EXISTS products;
DROP TABLE IF EXISTS decisions;
DROP TABLE IF EXISTS market_conditions;
DROP TABLE IF EXISTS performance_results;
DROP TABLE IF EXISTS product_performance;
DROP TABLE IF EXISTS events;
DROP TABLE IF EXISTS transactions;
DROP TABLE IF EXISTS research_projects;
DROP TABLE IF EXISTS human_resources;
DROP TABLE IF EXISTS marketing_campaigns;
DROP TABLE IF EXISTS competitor_actions;

-- Users table
CREATE TABLE users (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT UNIQUE NOT NULL,
  password_hash TEXT NOT NULL,
  role TEXT NOT NULL DEFAULT 'user',
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_users_email ON users(email);

-- Simulations table
CREATE TABLE simulations (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT,
  config TEXT NOT NULL,
  current_period INTEGER NOT NULL DEFAULT 0,
  status TEXT NOT NULL DEFAULT 'active',
  created_by TEXT NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (created_by) REFERENCES users(id)
);

CREATE INDEX idx_simulations_status ON simulations(status);
CREATE INDEX idx_simulations_created_by ON simulations(created_by);

-- Simulation Users table
CREATE TABLE simulation_users (
  id TEXT PRIMARY KEY,
  simulation_id TEXT NOT NULL,
  user_id TEXT NOT NULL,
  role TEXT NOT NULL DEFAULT 'participant',
  joined_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (simulation_id) REFERENCES simulations(id),
  FOREIGN KEY (user_id) REFERENCES users(id),
  UNIQUE(simulation_id, user_id)
);

CREATE INDEX idx_simulation_users_simulation_id ON simulation_users(simulation_id);
CREATE INDEX idx_simulation_users_user_id ON simulation_users(user_id);

-- Companies table
CREATE TABLE companies (
  id TEXT PRIMARY KEY,
  simulation_id TEXT NOT NULL,
  user_id TEXT NOT NULL,
  name TEXT NOT NULL,
  description TEXT,
  logo_url TEXT,
  cash_balance REAL NOT NULL DEFAULT 1000000,
  total_assets REAL NOT NULL DEFAULT 1000000,
  total_liabilities REAL NOT NULL DEFAULT 0,
  credit_rating TEXT NOT NULL DEFAULT 'B',
  brand_value REAL NOT NULL DEFAULT 50,
  data TEXT NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (simulation_id) REFERENCES simulations(id),
  FOREIGN KEY (user_id) REFERENCES users(id)
);

CREATE INDEX idx_companies_simulation_id ON companies(simulation_id);
CREATE INDEX idx_companies_user_id ON companies(user_id);

-- Products table
CREATE TABLE products (
  id TEXT PRIMARY KEY,
  company_id TEXT NOT NULL,
  name TEXT NOT NULL,
  description TEXT,
  category TEXT NOT NULL,
  quality_rating REAL NOT NULL DEFAULT 5,
  innovation_rating REAL NOT NULL DEFAULT 5,
  sustainability_rating REAL NOT NULL DEFAULT 5,
  production_cost REAL NOT NULL,
  selling_price REAL NOT NULL,
  inventory_level INTEGER NOT NULL DEFAULT 0,
  production_capacity INTEGER NOT NULL DEFAULT 1000,
  development_cost REAL NOT NULL DEFAULT 0,
  marketing_budget REAL NOT NULL DEFAULT 0,
  status TEXT NOT NULL DEFAULT 'development',
  launch_period INTEGER,
  discontinue_period INTEGER,
  data TEXT NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (company_id) REFERENCES companies(id)
);

CREATE INDEX idx_products_company_id ON products(company_id);
CREATE INDEX idx_products_category ON products(category);
CREATE INDEX idx_products_status ON products(status);

-- Decisions table
CREATE TABLE decisions (
  id TEXT PRIMARY KEY,
  company_id TEXT NOT NULL,
  period INTEGER NOT NULL,
  type TEXT NOT NULL,
  data TEXT NOT NULL,
  submitted_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  processed BOOLEAN NOT NULL DEFAULT FALSE,
  processed_at TIMESTAMP,
  FOREIGN KEY (company_id) REFERENCES companies(id)
);

CREATE INDEX idx_decisions_company_id ON decisions(company_id);
CREATE INDEX idx_decisions_period ON decisions(period);
CREATE INDEX idx_decisions_type ON decisions(type);
CREATE INDEX idx_decisions_processed ON decisions(processed);

-- Market Conditions table
CREATE TABLE market_conditions (
  id TEXT PRIMARY KEY,
  simulation_id TEXT NOT NULL,
  period INTEGER NOT NULL,
  total_market_size REAL NOT NULL,
  segment_distribution TEXT NOT NULL,
  economic_indicators TEXT NOT NULL,
  consumer_preferences TEXT NOT NULL,
  technology_trends TEXT NOT NULL,
  sustainability_importance REAL NOT NULL,
  data TEXT NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (simulation_id) REFERENCES simulations(id),
  UNIQUE(simulation_id, period)
);

CREATE INDEX idx_market_conditions_simulation_id ON market_conditions(simulation_id);
CREATE INDEX idx_market_conditions_period ON market_conditions(period);

-- Performance Results table
CREATE TABLE performance_results (
  id TEXT PRIMARY KEY,
  company_id TEXT NOT NULL,
  period INTEGER NOT NULL,
  revenue REAL NOT NULL DEFAULT 0,
  costs REAL NOT NULL DEFAULT 0,
  profit REAL NOT NULL DEFAULT 0,
  market_share REAL NOT NULL DEFAULT 0,
  cash_flow REAL NOT NULL DEFAULT 0,
  roi REAL NOT NULL DEFAULT 0,
  customer_satisfaction REAL NOT NULL DEFAULT 0,
  employee_satisfaction REAL NOT NULL DEFAULT 0,
  sustainability_score REAL NOT NULL DEFAULT 0,
  innovation_score REAL NOT NULL DEFAULT 0,
  brand_value_change REAL NOT NULL DEFAULT 0,
  data TEXT NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (company_id) REFERENCES companies(id),
  UNIQUE(company_id, period)
);

CREATE INDEX idx_performance_results_company_id ON performance_results(company_id);
CREATE INDEX idx_performance_results_period ON performance_results(period);

-- Product Performance table
CREATE TABLE product_performance (
  id TEXT PRIMARY KEY,
  product_id TEXT NOT NULL,
  period INTEGER NOT NULL,
  sales_volume INTEGER NOT NULL DEFAULT 0,
  revenue REAL NOT NULL DEFAULT 0,
  costs REAL NOT NULL DEFAULT 0,
  profit REAL NOT NULL DEFAULT 0,
  market_share REAL NOT NULL DEFAULT 0,
  customer_satisfaction REAL NOT NULL DEFAULT 0,
  data TEXT NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (product_id) REFERENCES products(id),
  UNIQUE(product_id, period)
);

CREATE INDEX idx_product_performance_product_id ON product_performance(product_id);
CREATE INDEX idx_product_performance_period ON product_performance(period);

-- Events table
CREATE TABLE events (
  id TEXT PRIMARY KEY,
  simulation_id TEXT NOT NULL,
  period INTEGER NOT NULL,
  type TEXT NOT NULL,
  name TEXT NOT NULL,
  description TEXT NOT NULL,
  impact_area TEXT NOT NULL,
  impact_strength REAL NOT NULL,
  affected_companies TEXT,
  data TEXT NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (simulation_id) REFERENCES simulations(id)
);

CREATE INDEX idx_events_simulation_id ON events(simulation_id);
CREATE INDEX idx_events_period ON events(period);
CREATE INDEX idx_events_type ON events(type);

-- Transactions table
CREATE TABLE transactions (
  id TEXT PRIMARY KEY,
  company_id TEXT NOT NULL,
  period INTEGER NOT NULL,
  type TEXT NOT NULL,
  amount REAL NOT NULL,
  description TEXT NOT NULL,
  category TEXT NOT NULL,
  reference_id TEXT,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (company_id) REFERENCES companies(id)
);

CREATE INDEX idx_transactions_company_id ON transactions(company_id);
CREATE INDEX idx_transactions_period ON transactions(period);
CREATE INDEX idx_transactions_type ON transactions(type);
CREATE INDEX idx_transactions_category ON transactions(category);

-- Research Projects table
CREATE TABLE research_projects (
  id TEXT PRIMARY KEY,
  company_id TEXT NOT NULL,
  name TEXT NOT NULL,
  description TEXT,
  type TEXT NOT NULL,
  budget REAL NOT NULL,
  start_period INTEGER NOT NULL,
  duration INTEGER NOT NULL,
  progress REAL NOT NULL DEFAULT 0,
  status TEXT NOT NULL DEFAULT 'active',
  results TEXT,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (company_id) REFERENCES companies(id)
);

CREATE INDEX idx_research_projects_company_id ON research_projects(company_id);
CREATE INDEX idx_research_projects_status ON research_projects(status);

-- Human Resources table
CREATE TABLE human_resources (
  id TEXT PRIMARY KEY,
  company_id TEXT NOT NULL,
  period INTEGER NOT NULL,
  total_employees INTEGER NOT NULL DEFAULT 100,
  average_salary REAL NOT NULL DEFAULT 50000,
  training_budget REAL NOT NULL DEFAULT 0,
  employee_satisfaction REAL NOT NULL DEFAULT 50,
  productivity REAL NOT NULL DEFAULT 1,
  turnover_rate REAL NOT NULL DEFAULT 0.15,
  data TEXT NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (company_id) REFERENCES companies(id),
  UNIQUE(company_id, period)
);

CREATE INDEX idx_human_resources_company_id ON human_resources(company_id);
CREATE INDEX idx_human_resources_period ON human_resources(period);

-- Marketing Campaigns table
CREATE TABLE marketing_campaigns (
  id TEXT PRIMARY KEY,
  company_id TEXT NOT NULL,
  product_id TEXT,
  name TEXT NOT NULL,
  description TEXT,
  budget REAL NOT NULL,
  start_period INTEGER NOT NULL,
  duration INTEGER NOT NULL,
  target_segment TEXT NOT NULL,
  channel_allocation TEXT NOT NULL,
  effectiveness REAL,
  status TEXT NOT NULL DEFAULT 'active',
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (company_id) REFERENCES companies(id),
  FOREIGN KEY (product_id) REFERENCES products(id)
);

CREATE INDEX idx_marketing_campaigns_company_id ON marketing_campaigns(company_id);
CREATE INDEX idx_marketing_campaigns_product_id ON marketing_campaigns(product_id);
CREATE INDEX idx_marketing_campaigns_status ON marketing_campaigns(status);

-- Competitor Actions table
CREATE TABLE competitor_actions (
  id TEXT PRIMARY KEY,
  simulation_id TEXT NOT NULL,
  competitor_id TEXT NOT NULL,
  period INTEGER NOT NULL,
  type TEXT NOT NULL,
  data TEXT NOT NULL,
  in_response_to TEXT,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (simulation_id) REFERENCES simulations(id)
);

CREATE INDEX idx_competitor_actions_simulation_id ON competitor_actions(simulation_id);
CREATE INDEX idx_competitor_actions_competitor_id ON competitor_actions(competitor_id);
CREATE INDEX idx_competitor_actions_period ON competitor_actions(period);
CREATE INDEX idx_competitor_actions_type ON competitor_actions(type);

-- Insert demo user
INSERT INTO users (id, name, email, password_hash, role) VALUES 
('user_demo', 'Demo User', 'demo@example.com', '$2a$10$JdJF6rKy7Hm6pYYJTGqG5O1wHJzL0oLjn.O7wJxQFP/WU0MMwUU6.', 'user');

-- Insert demo simulation
INSERT INTO simulations (id, name, description, config, status, created_by) VALUES 
('sim_demo', 'Business Strategy Simulation', 'A simulation focused on strategic decision-making', 
'{"initial_cash":1000000,"periods":12,"market_segments":["budget","mid-range","premium"],"difficulty":"medium","events_frequency":0.3}', 
'active', 'user_demo');

-- Connect demo user to simulation
INSERT INTO simulation_users (id, simulation_id, user_id, role) VALUES 
('sim_user_demo', 'sim_demo', 'user_demo', 'participant');

-- Create demo company
INSERT INTO companies (id, simulation_id, user_id, name, description, cash_balance, data) VALUES 
('company_demo', 'sim_demo', 'user_demo', 'TechInnovate Inc.', 'A technology innovation company', 1000000, 
'{"mission_statement":"To innovate and transform technology","competitive_strategy":"differentiator"}');

-- Create market conditions for period 0
INSERT INTO market_conditions (id, simulation_id, period, total_market_size, segment_distribution, economic_indicators, consumer_preferences, technology_trends, sustainability_importance, data) VALUES 
('market_demo_0', 'sim_demo', 0, 5000000, 
'{"budget":0.3,"mid-range":0.4,"premium":0.3}', 
'{"gdp_growth":0.028,"inflation_rate":0.021,"interest_rate":0.035,"unemployment_rate":0.042,"consumer_confidence":102.8,"business_sentiment":56.4}', 
'{"budget":{"price_sensitivity":0.8,"quality_sensitivity":0.3,"brand_loyalty":0.2,"innovation_preference":0.2,"sustainability_preference":0.2},"mid-range":{"price_sensitivity":0.5,"quality_sensitivity":0.5,"brand_loyalty":0.4,"innovation_preference":0.4,"sustainability_preference":0.4},"premium":{"price_sensitivity":0.3,"quality_sensitivity":0.8,"brand_loyalty":0.7,"innovation_preference":0.6,"sustainability_preference":0.6}}', 
'[{"name":"AI and Machine Learning","impact_area":"product_development","impact_strength":0.25,"adoption_rate":0.4},{"name":"Internet of Things","impact_area":"customer_experience","impact_strength":0.2,"adoption_rate":0.35}]', 
0.67, 
'{}');

-- Create demo products
INSERT INTO products (id, company_id, name, description, category, quality_rating, innovation_rating, sustainability_rating, production_cost, selling_price, status, data) VALUES 
('product_demo_1', 'company_demo', 'Premium Widget', 'Our flagship premium widget', 'premium', 8.5, 7.2, 6.8, 150, 300, 'active', 
'{"features":["Advanced AI","Premium Materials","Extended Warranty"],"target_audience":"High-income professionals"}');

INSERT INTO products (id, company_id, name, description, category, quality_rating, innovation_rating, sustainability_rating, production_cost, selling_price, status, data) VALUES 
('product_demo_2', 'company_demo', 'Standard Widget', 'Our mid-range widget offering', 'mid-range', 6.5, 5.8, 6.0, 75, 150, 'active', 
'{"features":["Reliable Performance","Good Value"],"target_audience":"Middle-income consumers"}');

INSERT INTO products (id, company_id, name, description, category, quality_rating, innovation_rating, sustainability_rating, production_cost, selling_price, status, data) VALUES 
('product_demo_3', 'company_demo', 'Basic Widget', 'Our entry-level widget', 'budget', 4.5, 3.2, 5.0, 40, 80, 'development', 
'{"features":["Essential Functionality","Affordable"],"target_audience":"Budget-conscious consumers"}');
