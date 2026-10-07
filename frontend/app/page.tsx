type Experiment = {
  experiment: string;
  dataset: number;
  crop: string | null;
  epochs: number;
  validation_cases: number;
  dice: number;
  checkpoint: string;
};

type SampleResponse = {
  count: number;
  metric: string;
  best_experiment: Experiment | null;
  experiments: Experiment[];
};

async function getExperiments(): Promise<SampleResponse> {
  const apiBase = process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://127.0.0.1:8000/api";
  const response = await fetch(`${apiBase}/experiments/sample/`, { cache: "no-store" });

  if (!response.ok) {
    throw new Error("ModelBrief API에서 실험 데이터를 불러오지 못했습니다.");
  }
  return response.json();
}

export default async function Home() {
  const data = await getExperiments();
  const maxDice = Math.max(...data.experiments.map((item) => item.dice), 1);

  return (
    <main className="shell">
      <header className="hero">
        <div>
          <p className="eyebrow">AI EXPERIMENT INTELLIGENCE</p>
          <h1>ModelBrief</h1>
          <p className="subtitle">
            흩어진 AI 실험 결과를 비교하고, 실제 등록된 근거를 기반으로 분석하는 개인 프로젝트
          </p>
        </div>
        <div className="status">MVP · Phase 1</div>
      </header>

      <section className="summaryGrid">
        <article className="card">
          <span>등록 실험</span>
          <strong>{data.count}</strong>
          <small>CT tumor segmentation</small>
        </article>
        <article className="card">
          <span>최고 Dice</span>
          <strong>{data.best_experiment?.dice.toFixed(4) ?? "-"}</strong>
          <small>{data.best_experiment?.experiment ?? "No data"}</small>
        </article>
        <article className="card">
          <span>비교 지표</span>
          <strong>{data.metric}</strong>
          <small>segmentation overlap metric</small>
        </article>
      </section>

      <section className="panel">
        <div className="panelHeading">
          <div>
            <p className="eyebrow">EXPERIMENT COMPARISON</p>
            <h2>실험 성능 비교</h2>
          </div>
          <span className="badge">Source: CSV</span>
        </div>

        <div className="chart">
          {data.experiments.map((item) => (
            <div className="barRow" key={item.experiment}>
              <span className="barLabel">{item.experiment}</span>
              <div className="barTrack">
                <div className="barFill" style={{ width: `${(item.dice / maxDice) * 100}%` }} />
              </div>
              <strong>{item.dice.toFixed(4)}</strong>
            </div>
          ))}
        </div>

        <div className="tableWrap">
          <table>
            <thead>
              <tr>
                <th>Experiment</th>
                <th>Dataset</th>
                <th>Crop</th>
                <th>Epochs</th>
                <th>Validation</th>
                <th>Dice</th>
                <th>Checkpoint</th>
              </tr>
            </thead>
            <tbody>
              {data.experiments.map((item) => (
                <tr key={item.experiment}>
                  <td>{item.experiment}</td>
                  <td>{item.dataset}</td>
                  <td>{item.crop ?? "-"}</td>
                  <td>{item.epochs}</td>
                  <td>{item.validation_cases}</td>
                  <td className="metric">{item.dice.toFixed(4)}</td>
                  <td>{item.checkpoint}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <p className="notice">
        Dice는 분할 영역의 겹침 지표이며 임상 진단 정확도 또는 병기 분류 정확도를 의미하지 않습니다.
      </p>
    </main>
  );
}
