# ModelBrief

> 등록된 AI 실험 데이터를 비교하고, 근거가 보이는 LLM 분석과 보고서 초안을 만드는 개인 프로젝트

## Why

모델 실험이 늘어날수록 데이터셋, 학습 조건, 지표, 결과 기록이 흩어집니다. ModelBrief는 실험 정보를 한곳에서 비교하고, 등록된 데이터만 근거로 결과를 설명하도록 돕습니다.

이 프로젝트는 의료 진단이나 치료를 수행하지 않습니다. LLM은 수치를 계산하거나 사실을 만들어내지 않으며, 서버가 계산한 비교 결과를 바탕으로 해석과 보고서 초안을 생성합니다.

## MVP

- CSV 기반 실험 등록과 검증
- 여러 실험의 지표·조건 비교
- 근거 항목이 포함된 LLM 분석
- 목적·조건·결과·한계로 구성된 보고서 초안

## Initial demo data

`data/sample/ct_segmentation_experiments.csv`에는 LUNG-CDSS에서 수행한 CT 종양 분할 실험 기록 4건을 익명화한 데모 데이터로 제공합니다.

`Dice`는 분할 영역의 겹침 지표이며, 임상 진단 정확도나 병기 분류 정확도를 뜻하지 않습니다.

## Planned stack

- Frontend: Next.js, TypeScript, Tailwind CSS
- Backend: Django REST Framework, PostgreSQL, JWT
- LLM: structured experimental data only
- Deployment: Docker Compose

## Project status

Planning and repository initialization.

Detailed scope: [MVP plan](docs/MVP_PLAN.md)
